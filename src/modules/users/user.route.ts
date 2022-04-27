import express from 'express'
import { configs } from '../../configs'
import { AuthMiddleWare } from '../auth/auth.middleware'
import { AuthService } from '../auth/auth.service'
import { MailService } from '../mail/mail.service'
import { NotificationService } from '../notification/notification.service'
import { mailQueue } from '../queue/mail-queue.service'
import { notificationQueue } from '../queue/notification-queue.service'
import { redisService } from '../redis/redis.service'
import { UserController } from './user.controller'
import { UserMiddleWare } from './user.middleware'
import { UserService } from './user.service'

const notificationService = new NotificationService(configs, notificationQueue)

const authService = new AuthService(configs, redisService)
const mailService = new MailService(configs, mailQueue)
const userService = new UserService(
    notificationService,
    authService,
    mailService
)

const userController = new UserController(authService, userService)
const userMiddleware = new UserMiddleWare()

const authMiddleware = new AuthMiddleWare(authService)

export const userRouter = express.Router()

userRouter.post(
    '/sign-up',
    userMiddleware.tranformAndValidateCreateUserReq,
    userController.signUp
)

userRouter.post('/sign-in', userController.signIn)

userRouter.get(
    '/profile',
    authMiddleware.authorization,
    userController.getProfile
)
userRouter.post(
    '/sign-out',
    authMiddleware.authorization,
    userController.signOut
)
userRouter.post(
    '/notification',
    authMiddleware.authorization,
    userController.pushNotification
)
