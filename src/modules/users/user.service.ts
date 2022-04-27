import bcrypt from 'bcrypt'
import { database } from '../../database/connection'
import { Errors } from '../../helpers/error'
import { genFullName } from '../../helpers/utils'

import { CreateUserDTO } from './dtos/user-create.dto'
import UserDevice from './models/user-device.model'
import { User } from './models/user.model'
import { SignInDTO, UserDTO } from './dtos/user.dto'
import { UserDeviceDTO } from './dtos/user-device.dto'
import { PushNotificationRequestDTO } from '../notification/notification.dto'
import { NotificationService } from '../notification/notification.service'
import { logger } from '../../helpers/logger'
import { redisService } from '../redis/redis.service'
import { AuthService } from '../auth/auth.service'
import { MailService, MAIL_CHAT } from '../mail/mail.service'
import { configs } from '../../configs'

export class UserService {
    notificationService: NotificationService
    authService: AuthService
    mailService: MailService
    constructor(
        notificationService: NotificationService,
        authService: AuthService,
        mailService: MailService
    ) {
        this.notificationService = notificationService
        this.authService = authService
        this.mailService = mailService
    }

    async signUp(params: CreateUserDTO) {
        // validate user info
        await this.validateUserRegistrationInfo(params)
        let newUserId: number
        await database.transaction(async (transaction) => {
            // create wolfden user
            params.fullName = genFullName(
                params.firstName,
                params.middleName,
                params.lastName
            )
            params.password = await bcrypt.hash(params.password, 10)
            const user = await User.create(params, { transaction })

            newUserId = user.userId
        })
        const token = await this.authService.signToken(newUserId)
        const user = await User.findOne({ where: { userId: newUserId } })
        const res = UserDTO.fromUser(user)
        res.accessToken = token

        const record = CreateUserDTO.toUserDevice(params)
        record.createdBy = newUserId
        record.userId = newUserId
        record.token = token
        await this.createUserDevice(record)

        return res
    }

    async signIn(params: SignInDTO) {
        const user = await User.findOne({
            where: { userName: params.userName },
        })

        if (user == null) {
            throw Errors.UserNotFound
        }
        const isValidPassword = bcrypt.compareSync(
            params.password,
            user.password
        )
        if (!isValidPassword) {
            throw Errors.InvalidPassword
        }
        const token = await this.authService.signToken(user.userId)

        //create userDevice
        const record = SignInDTO.toUserDevice(params)
        record.createdBy = user.userId
        record.userId = user.userId
        record.token = token
        record.email = user.email
        await this.createUserDevice(record)

        const res = UserDTO.fromUser(user)
        res.accessToken = token
        return res
    }
    async signOut(userId: number, token: string) {
        console.log(userId, token)
        await redisService.removeToken(userId, token)
        await this.removePushNotification(userId, token)
    }

    async getProfile(userId: number) {
        return await User.findOne({ where: { userId: userId } })
    }

    async pushNotification(params: PushNotificationRequestDTO) {
        const user = await User.findOne({
            where: {
                userName: params.userName,
            },
        })
        if (!user) {
            throw Errors.UserNotFound
        }
        const userSend = await User.findByPk(params.userId)
        const userDevices = await UserDevice.findAll({
            where: { userId: user.userId },
            raw: false,
        })
        const fcmTokens = userDevices.map((e) => e.tokenFireBase)

        const payload = {
            title: `${userSend.fullName} send a message.`,
            body: params.content,
            fcm_tokens: fcmTokens,
            click_action: configs.clientUrl,
        }

        if (fcmTokens.length > 0) {
            logger.info(
                `pushNotification execute send notification ${JSON.stringify(
                    payload
                )}`
            )
            this.notificationService.sendNotificationToQueue(payload)
        }
        await this.sendResetPasswordMail(user.email, userSend.fullName)
    }

    private async validateUserRegistrationInfo(params: CreateUserDTO) {
        const existedUsername = await User.findOne({
            where: { userName: params.userName },
        })
        if (existedUsername) {
            throw Errors.AlreadyHaveWolfdenAccount
        }

        const existedEmail = await User.findOne({
            where: { email: params.email },
        })
        if (existedEmail) {
            throw Errors.ExistedEmail
        }

        const existedPhoneNumber = await User.findOne({
            where: { phoneNumber: params.phoneNumber },
        })
        if (existedPhoneNumber) {
            throw Errors.ExistedPhoneNumber
        }
    }
    createUserDevice = async (params: UserDeviceDTO) => {
        params.tokenFireBase = params.tokenFireBase ?? null
        //check existed userDevice
        const userDevice = await UserDevice.findOne({
            where: {
                userId: params.userId,
                token: params.token,
                tokenFireBase: params.tokenFireBase,
            },
        })

        if (userDevice) {
            await UserDevice.update(params, {
                where: {
                    userId: params.userId,
                    token: params.token,
                    tokenFireBase: params.tokenFireBase,
                },
            })
        } else {
            await UserDevice.create(params)
        }
    }
    removePushNotification = async (userId: number, token: string) => {
        // query get tokenFireBase
        await UserDevice.destroy({
            where: {
                userId: userId,
                token: token,
            },
        })
    }
    private sendResetPasswordMail = async (email: string, fullName: string) => {
        const content = await this.mailService.readTemplate(MAIL_CHAT)
        await this.mailService.sendMailToQueue({
            from: configs.userNameMailer,
            to: email,
            subject: `${fullName} send a message.`,
            html: content.replace('#link_chats', configs.clientUrl),
            // html: content.replace(
            //     '#reset_password_link',
            //     `${this.conf.siteUrl}/reset-password/?key=${token}`
            // ),
        })
    }
}
