"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const base_enity_1 = require("../../base/base.enity");
let UserDevice = class UserDevice extends base_enity_1.BaseModel {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ field: 'UserDeviceId', type: sequelize_1.DataTypes.INTEGER({ length: 11 }) }),
    __metadata("design:type", Number)
], UserDevice.prototype, "userDeviceId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: 'TokenFireBase', type: sequelize_1.DataTypes.STRING({ length: 255 }) }),
    __metadata("design:type", String)
], UserDevice.prototype, "tokenFireBase", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({ field: 'UserId', type: sequelize_1.DataTypes.INTEGER({ length: 11 }) }),
    __metadata("design:type", Number)
], UserDevice.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({ field: 'Token', type: sequelize_1.DataTypes.STRING({ length: 128 }) }),
    __metadata("design:type", String)
], UserDevice.prototype, "token", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({ field: 'Email', type: sequelize_1.DataTypes.STRING({ length: 128 }) }),
    __metadata("design:type", String)
], UserDevice.prototype, "email", void 0);
UserDevice = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'UserDevice',
    })
], UserDevice);
exports.default = UserDevice;
//# sourceMappingURL=user-device.model.js.map