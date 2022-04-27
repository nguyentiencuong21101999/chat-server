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
exports.notificationWorker = exports.notificationQueue = exports.NotificationQueueName = void 0;
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const configs_1 = require("../../configs");
const notification_service_1 = require("../notification/notification.service");
exports.NotificationQueueName = 'notification';
const ioRedis = new ioredis_1.default(configs_1.configs.redisURI, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
});
exports.notificationQueue = new bullmq_1.Queue(exports.NotificationQueueName, {
    connection: ioRedis,
    defaultJobOptions: {
        removeOnComplete: false,
        removeOnFail: 1000,
    },
});
const notificationService = new notification_service_1.NotificationService(configs_1.configs, exports.notificationQueue);
exports.notificationWorker = new bullmq_1.Worker(exports.NotificationQueueName, (job) => __awaiter(void 0, void 0, void 0, function* () {
    yield notificationService.sendNotification(job.data);
}), { connection: ioRedis });
//# sourceMappingURL=notification-queue.service.js.map