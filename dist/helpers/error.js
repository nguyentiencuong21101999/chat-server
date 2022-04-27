"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.Success = exports.Errors = exports.ErrorResp = void 0;
const class_transformer_1 = require("class-transformer");
const logger_1 = require("./logger");
const response_wrapper_1 = require("./response.wrapper");
class ErrorResp extends Error {
    constructor(code, message, status) {
        super();
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ErrorResp.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ErrorResp.prototype, "code", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ErrorResp.prototype, "message", void 0);
exports.ErrorResp = ErrorResp;
exports.Errors = {
    Ok: new ErrorResp('error.ok', 'Ok', 200),
    BadRequest: new ErrorResp('error.badRequest', 'Bad request', 400),
    Unauthorized: new ErrorResp('error.unauthorized', 'Unauthorized', 401),
    Forbidden: new ErrorResp('error.forbiden', 'Forbidden', 403),
    Sensitive: new ErrorResp('error.sensitive', 'An error occurred, please try again later.', 400),
    InternalServerError: new ErrorResp('error.internalServerError', 'Internal server error.', 500),
    AlreadyHaveColossalAccount: new ErrorResp('error.alreadyHaveColossalAccount', 'Already have colossal account.'),
    AlreadyHaveWolfdenAccount: new ErrorResp('error.alreadyHaveWolfdenAccount', 'Already have wolfden account.'),
    ExistedEmail: new ErrorResp('error.existedEmail', 'Email existed.'),
    ExistedPhoneNumber: new ErrorResp('error.existedPhoneNumber', 'Phone number existed.'),
    UserNotFound: new ErrorResp('error.userNotFound', 'User not found.'),
    InvalidPassword: new ErrorResp('error.invalidPassword', 'Invalid password.'),
};
exports.Success = {
    SignOut: new ErrorResp('error.signOutSuccess', 'Sign out success.'),
};
const handleError = (err, res) => {
    if (err instanceof ErrorResp) {
        const errResp = err;
        res.status(errResp.status || exports.Errors.Ok.status).send(new response_wrapper_1.ResponseWrapper(null, (0, class_transformer_1.plainToInstance)(ErrorResp, errResp, {
            excludeExtraneousValues: true,
        })));
    }
    else {
        logger_1.logger.error(err);
        res.status(exports.Errors.Sensitive.status).send(new response_wrapper_1.ResponseWrapper(null, exports.Errors.Sensitive));
    }
};
exports.handleError = handleError;
//# sourceMappingURL=error.js.map