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
exports.redisService = exports.RedisService = void 0;
const redis_1 = require("redis");
const configs_1 = require("../../configs");
const logger_1 = require("../../helpers/logger");
const WD_ACCESS_TOKEN_KEY = 'wd_access_token';
class RedisService {
    constructor(conf) {
        this.conf = conf;
        this.client = (0, redis_1.createClient)({ url: this.conf.redisURI });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect();
            logger_1.logger.info('Redis connect successful!');
        });
    }
    getTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.client.hGet(WD_ACCESS_TOKEN_KEY, userId.toString());
            if (res != null) {
                return new Set(res.split(','));
            }
            return new Set();
        });
    }
    setToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.hSet(WD_ACCESS_TOKEN_KEY, userId.toString(), token);
        });
    }
    addToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokens = yield this.getTokens(userId);
            tokens.add(token);
            yield this.setToken(userId, [...tokens].join(','));
        });
    }
    removeToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokens = yield this.getTokens(userId);
            tokens.delete(token);
            yield this.setToken(userId, [...tokens].join(','));
        });
    }
}
exports.RedisService = RedisService;
exports.redisService = new RedisService(configs_1.configs);
exports.redisService.client.on('error', (err) => logger_1.logger.error('Redis Client Error', err));
//# sourceMappingURL=redis.service.js.map