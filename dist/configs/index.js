"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProduction = exports.configs = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = process.env;
exports.configs = {
    port: '4000',
    // dbURI: 'mysql://root:AbCd@1234@localhost:3306/chat', //change
    //redisURI: 'redis://localhost:6379',
    dbURI: 'mysql://sql3488537:RzUeVJZ5aP@sql3.freemysqlhosting.net:3306/sql3488537',
    redisURI: 'redis://tiencuong0:Tiencuong@123@redis-15461.c52.us-east-1-4.ec2.cloud.redislabs.com:15461',
    secretKey: 'zzZA4oMsjw.rzgMVwnrD!PMPHp2RuZe@',
    fcmUri: 'https://fcm.googleapis.com/fcm/send ',
    fcmServerKey: 'AAAA-oi89b8:APA91bELNkNfKt9mUvaVFQD-R_ILA4mRQSu_vVHOxHMXuUV0zJtthjNdKcu7i4ofb4i60MSAinOUj5pAJVHLM3_dP_6I8EKxwbohk7beJigN_HnmHLq3oIqdWrg9njoNavEMLbxP7c9E',
    userNameMailer: 'chats.21.10.1999@gmail.com',
    passwordMailer: 'tiencuong@123',
    clientUrl: 'http://localhost:3000',
};
const isProduction = () => {
    return env.NODE_ENV == 'production';
};
exports.isProduction = isProduction;
//# sourceMappingURL=index.js.map