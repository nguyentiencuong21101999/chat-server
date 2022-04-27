"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = exports.PushNotificationRequestDTO = void 0;
const class_transformer_1 = require("class-transformer");
class PushNotificationRequestDTO {
}
exports.PushNotificationRequestDTO = PushNotificationRequestDTO;
PushNotificationRequestDTO.toPushNotificationRequestDTO = (req) => {
    return (0, class_transformer_1.plainToInstance)(PushNotificationRequestDTO, req.body);
};
var NotificationType;
(function (NotificationType) {
    NotificationType[NotificationType["message"] = 1] = "message";
    NotificationType[NotificationType["reaction"] = 2] = "reaction";
    NotificationType[NotificationType["file"] = 3] = "file";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
//# sourceMappingURL=notification.dto.js.map