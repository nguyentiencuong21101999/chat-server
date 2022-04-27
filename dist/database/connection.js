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
exports.execProc = exports.database = void 0;
const class_transformer_1 = require("class-transformer");
const humps_1 = __importDefault(require("humps"));
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const configs_1 = require("../configs");
const logger_1 = require("../helpers/logger");
// import { UserAdvance } from '../modules/users/models/user-advance.model'
const user_device_model_1 = __importDefault(require("../modules/users/models/user-device.model"));
const user_model_1 = require("../modules/users/models/user.model");
exports.database = new sequelize_typescript_1.Sequelize(configs_1.configs.dbURI, {
    dialect: 'mysql',
    logging: (msg) => logger_1.logger.info(msg),
    models: [user_model_1.User, user_device_model_1.default],
});
/** Execute store procedure */
const execProc = (Model, procName, opts) => __awaiter(void 0, void 0, void 0, function* () {
    const params = opts.replacements || [];
    const qs = [];
    for (let i = 0; i < params.length; i++) {
        qs.push('?');
    }
    const [res] = yield exports.database.query(`CALL ${procName}(${qs.join(',')})`, {
        replacements: params,
        type: sequelize_1.QueryTypes.SELECT,
        transaction: opts.transaction,
    });
    const obj = [];
    for (const i in res) {
        obj.push(res[i]);
    }
    if (opts.plain) {
        logger_1.logger.info(JSON.stringify(obj[0]));
        return (0, class_transformer_1.plainToInstance)(Model, humps_1.default.camelizeKeys(obj[0]), {
            excludeExtraneousValues: true,
        });
    }
    logger_1.logger.info(JSON.stringify(obj));
    return (0, class_transformer_1.plainToInstance)(Model, humps_1.default.camelizeKeys(obj), {
        excludeExtraneousValues: true,
    });
});
exports.execProc = execProc;
//# sourceMappingURL=connection.js.map