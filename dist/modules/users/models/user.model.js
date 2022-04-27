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
exports.User = void 0;
const class_transformer_1 = require("class-transformer");
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const base_enity_1 = require("../../base/base.enity");
let User = class User extends base_enity_1.BaseModel {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ field: 'UserId', autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(32), field: 'UserName' }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(255), field: 'Pass' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(5), field: 'Title' }),
    __metadata("design:type", String)
], User.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(32), field: 'FirstName' }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(''),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(32), field: 'MiddleName' }),
    __metadata("design:type", String)
], User.prototype, "middleName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(32), field: 'LastName' }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(128), field: 'FullName' }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.STRING(64),
        field: 'Email',
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.DATEONLY, field: 'DOB' }),
    __metadata("design:type", String)
], User.prototype, "dob", void 0);
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.STRING(16),
        field: 'PhoneNumber',
    }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(32), field: 'RefUserId' }),
    __metadata("design:type", String)
], User.prototype, "refUserId", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.STRING(128),
        field: 'ProfileUrl',
    }),
    __metadata("design:type", String)
], User.prototype, "profileUrl", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    (0, sequelize_typescript_1.Column)({ field: 'DeletedDate' }),
    __metadata("design:type", Date
    // @Default(0)
    // @Column({ type: DataTypes.BOOLEAN, field: 'IsPrivateAccount' })
    // isPrivateAccount: boolean
    // @Default(0)
    // @Column({ type: DataTypes.BOOLEAN, field: 'IsWolfdenAccount' })
    // isWolfdenAccount: boolean
    // @Default(1)
    // @Column({ type: DataTypes.BOOLEAN, field: 'IsTurnOnCopyBet' })
    // isTurnOnCopyBet: boolean
    // @Default(0)
    // @Column({ type: DataTypes.BOOLEAN, field: 'IsDepositLimit' })
    // isDepositLimit: boolean
    // @Default(0)
    // @Column({ type: DataTypes.DECIMAL(15, 2), field: 'DepositLimitValue' })
    // depositLimitValue: number
    // @Default(1)
    // @Column({
    //     type: DataTypes.DECIMAL(6, 1),
    //     field: 'DepositLimitPeriodInHour',
    // })
    // depositLimitPeriodInHour: number
    // @Default(0)
    // @Column({ type: DataTypes.BOOLEAN, field: 'IsAuthenticProfile' })
    // isAuthenticProfile: boolean
    // @Column({
    //     type: DataTypes.DATE,
    //     field: 'AuthenticProfileDate',
    // })
    // authenticProfileDate: string
    // @Default(1)
    // @Column({ type: DataTypes.BOOLEAN, field: 'IsActive' })
    // isActive: boolean
    )
], User.prototype, "deletedDate", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'User', paranoid: true })
], User);
exports.User = User;
//# sourceMappingURL=user.model.js.map