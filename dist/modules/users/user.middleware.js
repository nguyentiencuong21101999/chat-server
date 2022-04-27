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
exports.UserMiddleWare = void 0;
const class_validator_1 = require("class-validator");
const validator_1 = require("../../helpers/validator");
const user_create_dto_1 = require("./dtos/user-create.dto");
class UserMiddleWare {
    tranformAndValidateCreateUserReq(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body = user_create_dto_1.CreateUserDTO.fromReq(req);
                yield (0, class_validator_1.validateOrReject)(req.body);
                next();
            }
            catch (err) {
                next((0, validator_1.parseValidationError)(err));
            }
        });
    }
}
exports.UserMiddleWare = UserMiddleWare;
//# sourceMappingURL=user.middleware.js.map