import express from 'express'
import { configs } from '../../configs'
import { AuthMiddleWare } from '../auth/auth.middleware'
import { AuthService } from '../auth/auth.service'
import { redisService } from '../redis/redis.service'
import { UserController } from './user.controller'
import { UserMiddleWare } from './user.middleware'
import { UserService } from './user.service'

const authService = new AuthService(configs, redisService)
const userService = new UserService()

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
