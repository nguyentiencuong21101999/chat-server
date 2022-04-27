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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const error_1 = require("../../helpers/error");
const response_wrapper_1 = require("../../helpers/response.wrapper");
const notification_dto_1 = require("../notification/notification.dto");
class UserController {
    constructor(authService, userService) {
        this.signUp = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.signUp(req.body);
                res.send(new response_wrapper_1.ResponseWrapper(user, null, null));
            }
            catch (err) {
                next(err);
            }
        });
        this.signIn = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.signIn(req.body);
                res.send(new response_wrapper_1.ResponseWrapper(user, null, null));
            }
            catch (err) {
                next(err);
            }
        });
        this.signOut = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = req.headers['authorization'];
                const [, token] = authHeader && authHeader.split(' ');
                yield this.userService.signOut(req.userId, token);
                res.send(new response_wrapper_1.ResponseWrapper(true, error_1.Success.SignOut, null));
            }
            catch (err) {
                next(err);
            }
        });
        this.getProfile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getProfile(req.userId);
                res.send(new response_wrapper_1.ResponseWrapper(user, null, null));
            }
            catch (err) {
                next(err);
            }
        });
        this.pushNotification = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = notification_dto_1.PushNotificationRequestDTO.toPushNotificationRequestDTO(req);
                params.userId = req.userId;
                yield this.userService.pushNotification(params);
                res.send(new response_wrapper_1.ResponseWrapper(true, null, null));
            }
            catch (err) {
                next(err);
            }
        });
        this.authService = authService;
        this.userService = userService;
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map