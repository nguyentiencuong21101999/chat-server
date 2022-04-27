"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverAdapter = void 0;
const api_1 = require("@bull-board/api");
const bullMQAdapter_1 = require("@bull-board/api/bullMQAdapter");
const express_1 = require("@bull-board/express");
const mail_queue_service_1 = require("./mail-queue.service");
const notification_queue_service_1 = require("./notification-queue.service");
exports.serverAdapter = new express_1.ExpressAdapter();
(0, api_1.createBullBoard)({
    queues: [
        new bullMQAdapter_1.BullMQAdapter(notification_queue_service_1.notificationQueue),
        new bullMQAdapter_1.BullMQAdapter(mail_queue_service_1.mailQueue),
    ],
    serverAdapter: exports.serverAdapter,
});
exports.serverAdapter.setBasePath('/admin/queues');
//# sourceMappingURL=queue.service.js.map