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
exports.AuthService = exports.AuthPayload = void 0;
const class_transformer_1 = require("class-transformer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../../helpers/error");
class AuthPayload {
}
exports.AuthPayload = AuthPayload;
class AuthService {
    constructor(conf, redisService) {
        this.signToken = (userId) => __awaiter(this, void 0, void 0, function* () {
            const sign = jsonwebtoken_1.default.sign({ userId: userId.toString() }, this.conf.secretKey);
            yield this.redis.addToken(userId, sign);
            return sign;
        });
        this.verifyToken = (token) => __awaiter(this, void 0, void 0, function* () {
            const decoded = jsonwebtoken_1.default.verify(token, this.conf.secretKey, {
                complete: true,
            });
            const authPayload = (0, class_transformer_1.plainToInstance)(AuthPayload, (0, class_transformer_1.instanceToPlain)(decoded.payload));
            const tokens = yield this.redis.getTokens(authPayload.userId);
            if (!tokens.has(token)) {
                throw error_1.Errors.Unauthorized;
            }
            return authPayload;
        });
        this.conf = conf;
        this.redis = redisService;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map