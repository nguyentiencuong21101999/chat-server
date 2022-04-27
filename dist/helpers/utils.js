"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genFullName = exports.ToTrim = exports.ToBoolean = void 0;
/** Transform 0/1 to true/false */
const ToBoolean = (param) => {
    if (param.value === 1) {
        return true;
    }
    else if (param.value == 0) {
        return false;
    }
    return param.value;
};
exports.ToBoolean = ToBoolean;
/** Transform path to full location url */
/** Transform to trim text */
const ToTrim = (param) => { var _a; return (_a = param === null || param === void 0 ? void 0 : param.value) === null || _a === void 0 ? void 0 : _a.trim(); };
exports.ToTrim = ToTrim;
const genFullName = (fn, mn, ln) => {
    const names = [fn];
    if (mn != null && mn != '') {
        names.push(mn);
    }
    names.push(ln);
    return names.join(' ');
};
exports.genFullName = genFullName;
//# sourceMappingURL=utils.js.map