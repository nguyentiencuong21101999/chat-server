"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const connection_1 = require("../../database/connection");
const error_1 = require("../../helpers/error");
const utils_1 = require("../../helpers/utils");
const user_create_dto_1 = require("./dtos/user-create.dto");
const user_device_model_1 = __importDefault(require("./models/user-device.model"));
const user_model_1 = require("./models/user.model");
const user_dto_1 = require("./dtos/user.dto");
const logger_1 = require("../../helpers/logger");
const redis_service_1 = require("../redis/redis.service");
const mail_service_1 = require("../mail/mail.service");
const configs_1 = require("../../configs");
class UserService {
    constructor(notificationService, authService, mailService) {
        this.createUserDevice = (params) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            params.tokenFireBase = (_a = params.tokenFireBase) !== null && _a !== void 0 ? _a : null;
            //check existed userDevice
            const userDevice = yield user_device_model_1.default.findOne({
                where: {
                    userId: params.userId,
                    token: params.token,
                    tokenFireBase: params.tokenFireBase,
                },
            });
            if (userDevice) {
                yield user_device_model_1.default.update(params, {
                    where: {
                        userId: params.userId,
                        token: params.token,
                        tokenFireBase: params.tokenFireBase,
                    },
                });
            }
            else {
                yield user_device_model_1.default.create(params);
            }
        });
        this.removePushNotification = (userId, token) => __awaiter(this, void 0, void 0, function* () {
            // query get tokenFireBase
            yield user_device_model_1.default.destroy({
                where: {
                    userId: userId,
                    token: token,
                },
            });
        });
        this.sendResetPasswordMail = (email, fullName) => __awaiter(this, void 0, void 0, function* () {
            const content = yield this.mailService.readTemplate(mail_service_1.MAIL_CHAT);
            yield this.mailService.sendMailToQueue({
                from: configs_1.configs.userNameMailer,
                to: email,
                subject: `${fullName} send a message.`,
                html: content.replace('#link_chats', configs_1.configs.clientUrl),
                // html: content.replace(
                //     '#reset_password_link',
                //     `${this.conf.siteUrl}/reset-password/?key=${token}`
                // ),
            });
        });
        this.notificationService = notificationService;
        this.authService = authService;
        this.mailService = mailService;
    }
    signUp(params) {
        return __awaiter(this, void 0, void 0, function* () {
            // validate user info
            yield this.validateUserRegistrationInfo(params);
            let newUserId;
            yield connection_1.database.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                // create wolfden user
                params.fullName = (0, utils_1.genFullName)(params.firstName, params.middleName, params.lastName);
                params.password = yield bcrypt_1.default.hash(params.password, 10);
                const user = yield user_model_1.User.create(params, { transaction });
                newUserId = user.userId;
            }));
            const token = yield this.authService.signToken(newUserId);
            const user = yield user_model_1.User.findOne({ where: { userId: newUserId } });
            const res = user_dto_1.UserDTO.fromUser(user);
            res.accessToken = token;
            const record = user_create_dto_1.CreateUserDTO.toUserDevice(params);
            record.createdBy = newUserId;
            record.userId = newUserId;
            record.token = token;
            yield this.createUserDevice(record);
            return res;
        });
    }
    signIn(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({
                where: { userName: params.userName },
            });
            if (user == null) {
                throw error_1.Errors.UserNotFound;
            }
            const isValidPassword = bcrypt_1.default.compareSync(params.password, user.password);
            if (!isValidPassword) {
                throw error_1.Errors.InvalidPassword;
            }
            const token = yield this.authService.signToken(user.userId);
            //create userDevice
            const record = user_dto_1.SignInDTO.toUserDevice(params);
            record.createdBy = user.userId;
            record.userId = user.userId;
            record.token = token;
            record.email = user.email;
            yield this.createUserDevice(record);
            const res = user_dto_1.UserDTO.fromUser(user);
            res.accessToken = token;
            return res;
        });
    }
    signOut(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(userId, token);
            yield redis_service_1.redisService.removeToken(userId, token);
            yield this.removePushNotification(userId, token);
        });
    }
    getProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.findOne({ where: { userId: userId } });
        });
    }
    pushNotification(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({
                where: {
                    userName: params.userName,
                },
            });
            if (!user) {
                throw error_1.Errors.UserNotFound;
            }
            const userSend = yield user_model_1.User.findByPk(params.userId);
            const userDevices = yield user_device_model_1.default.findAll({
                where: { userId: user.userId },
                raw: false,
            });
            const fcmTokens = userDevices.map((e) => e.tokenFireBase);
            const payload = {
                title: `${userSend.fullName} send a message.`,
                body: params.content,
                fcm_tokens: fcmTokens,
                click_action: configs_1.configs.clientUrl,
            };
            if (fcmTokens.length > 0) {
                logger_1.logger.info(`pushNotification execute send notification ${JSON.stringify(payload)}`);
                this.notificationService.sendNotificationToQueue(payload);
            }
            yield this.sendResetPasswordMail(user.email, userSend.fullName);
        });
    }
    validateUserRegistrationInfo(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const existedUsername = yield user_model_1.User.findOne({
                where: { userName: params.userName },
            });
            if (existedUsername) {
                throw error_1.Errors.AlreadyHaveWolfdenAccount;
            }
            const existedEmail = yield user_model_1.User.findOne({
                where: { email: params.email },
            });
            if (existedEmail) {
                throw error_1.Errors.ExistedEmail;
            }
            const existedPhoneNumber = yield user_model_1.User.findOne({
                where: { phoneNumber: params.phoneNumber },
            });
            if (existedPhoneNumber) {
                throw error_1.Errors.ExistedPhoneNumber;
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map