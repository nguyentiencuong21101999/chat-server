"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseValidationError = void 0;
const class_transformer_1 = require("class-transformer");
const error_1 = require("./error");
const parseValidationError = (err) => {
    const validationErrs = err;
    if (validationErrs.length == 0) {
        return err;
    }
    if (validationErrs[0].contexts != null) {
        const errValues = Object.values(validationErrs[0].contexts);
        if (errValues.length > 0) {
            const errResp = (0, class_transformer_1.plainToInstance)(error_1.ErrorResp, (0, class_transformer_1.instanceToPlain)(errValues[0]));
            if (errResp.message != null)
                return errResp;
        }
    }
    const error = error_1.Errors.BadRequest;
    if (validationErrs[0].constraints != null) {
        const constraintValues = Object.values(validationErrs[0].constraints);
        if (constraintValues.length > 0) {
            return new error_1.ErrorResp(error_1.Errors.BadRequest.code, constraintValues[0], error_1.Errors.BadRequest.status);
        }
    }
    return error;
};
exports.parseValidationError = parseValidationError;
//# sourceMappingURL=validator.js.map