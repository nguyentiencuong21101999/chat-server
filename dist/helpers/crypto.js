"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const configs_1 = require("../configs");
const algorithm = 'aes-256-ctr';
const iv = crypto_1.default.randomBytes(16);
const encrypt = (text) => {
    const cipher = crypto_1.default.createCipheriv(algorithm, configs_1.configs.secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString('hex') + '.' + encrypted.toString('hex');
};
exports.encrypt = encrypt;
const decrypt = (hash) => {
    const data = hash.split('.');
    if (data.length == 2) {
        const iv = data[0];
        const msg = data[1];
        const decipher = crypto_1.default.createDecipheriv(algorithm, configs_1.configs.secretKey, iv);
        const decrypted = Buffer.concat([
            decipher.update(Buffer.from(msg, 'hex')),
            decipher.final(),
        ]);
        return decrypted.toString();
    }
    return null;
};
exports.decrypt = decrypt;
//# sourceMappingURL=crypto.js.map