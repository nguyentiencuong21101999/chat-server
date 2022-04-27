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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const humps_1 = __importDefault(require("humps"));
const configs_1 = require("./configs");
const error_1 = require("./helpers/error");
const logger_1 = require("./helpers/logger");
const redis_service_1 = require("./modules/redis/redis.service");
const user_route_1 = require("./modules/users/user.route");
const app = (0, express_1.default)();
const port = configs_1.configs.port;
const avoidHumpsPaths = new Set();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// camelize keys
app.use((req, res, next) => {
    if (!avoidHumpsPaths.has(req.path)) {
        req.headers = humps_1.default.camelizeKeys(req.headers);
        req.body = humps_1.default.camelizeKeys(req.body);
        req.query = humps_1.default.camelizeKeys(req.query);
    }
    next();
});
app.get('/healthcheck', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ status: 'healthy' });
}));
app.use('/users', user_route_1.userRouter);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    (0, error_1.handleError)(err, res);
});
app.listen(process.env.PORT || port, () => __awaiter(void 0, void 0, void 0, function* () {
    // await database.sync({ alter: true })
    yield redis_service_1.redisService.connect();
    return logger_1.logger.info(`Server is listening at port ${port}`);
}));
//# sourceMappingURL=app.js.map