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
exports.BaseModel = void 0;
const class_transformer_1 = require("class-transformer");
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
class BaseModel extends sequelize_typescript_1.Model {
}
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, sequelize_typescript_1.Default)(1),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, field: 'CreatedBy' }),
    __metadata("design:type", Number)
], BaseModel.prototype, "createdBy", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({ field: 'CreatedDate' }),
    __metadata("design:type", Date)
], BaseModel.prototype, "createdDate", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, field: 'updateBy' }),
    __metadata("design:type", Number)
], BaseModel.prototype, "updatedBy", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({ field: 'UpdatedDate' }),
    __metadata("design:type", Date)
], BaseModel.prototype, "updatedDate", void 0);
exports.BaseModel = BaseModel;
//# sourceMappingURL=base.enity.js.map