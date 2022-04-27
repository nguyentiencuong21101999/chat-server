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
exports.MailService = exports.MAIL_CHAT = void 0;
const fs_1 = __importDefault(require("fs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const configs_1 = require("../../configs");
exports.MAIL_CHAT = 'chat';
class MailService {
    constructor(config, queue) {
        this.sendMail = (msg) => new Promise((resolve, reject) => {
            console.log(msg);
            this.transporter.sendMail(msg, (err, info) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(info);
            });
        });
        this.sendMailToQueue = (msg) => __awaiter(this, void 0, void 0, function* () {
            yield this.queue.add('mail', msg);
        });
        this.readTemplate = (name) => new Promise((resolve, reject) => {
            fs_1.default.readFile(`src/modules/mail/template/${name}.html`, (err, data) => {
                if (err)
                    return reject(err);
                resolve(data.toString());
            });
        });
        this.config = config;
        this.transporter = nodemailer_1.default.createTransport(`smtps://chats.21.10.1999%40gmail.com:${configs_1.configs.passwordMailer}@smtp.gmail.com`);
        this.queue = queue;
    }
}
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map