"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseWrapper = void 0;
class ResponseWrapper {
    constructor(data, error = null, pagination = null) {
        this.data = data;
        this.error = error;
        this.pagination = pagination;
    }
}
exports.ResponseWrapper = ResponseWrapper;
//# sourceMappingURL=response.wrapper.js.map