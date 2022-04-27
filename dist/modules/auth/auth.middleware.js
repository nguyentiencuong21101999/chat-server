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
exports.AuthMiddleWare = void 0;
const error_1 = require("../../helpers/error");
class AuthMiddleWare {
    constructor(authService) {
        this.authorization = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = req.headers['authorization'];
                const token = authHeader && authHeader.split(' ')[1];
                if (token == null) {
                    return next(error_1.Errors.Unauthorized);
                }
                const payload = yield this.authService.verifyToken(token);
                req.userId = payload.userId;
                next();
            }
            catch (error) {
                next(error_1.Errors.Unauthorized);
            }
        });
        this.authService = authService;
    }
}
exports.AuthMiddleWare = AuthMiddleWare;
//# sourceMappingURL=auth.middleware.js.map