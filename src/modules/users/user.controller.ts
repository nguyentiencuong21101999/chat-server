import { NextFunction, Response } from 'express'
import { Errors, Success } from '../../helpers/error'
import { ResponseWrapper } from '../../helpers/response.wrapper'
import { AuthRequest, AuthService } from '../auth/auth.service'
import { BodyRequest } from '../base/base.request'
import { PushNotificationRequestDTO } from '../notification/notification.dto'
import { CreateUserDTO } from './dtos/user-create.dto'
import { SignInDTO } from './dtos/user.dto'
import { UserService } from './user.service'

export class UserController {
    userService: UserService
    authService: AuthService

    constructor(authService: AuthService, userService: UserService) {
        this.authService = authService
        this.userService = userService
    }

    signUp = async (
        req: BodyRequest<CreateUserDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await this.userService.signUp(req.body)
            res.send(new ResponseWrapper(user, null, null))
        } catch (err) {
            next(err)
        }
    }

    signIn = async (
        req: BodyRequest<SignInDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await this.userService.signIn(req.body)

            res.send(new ResponseWrapper(user, null, null))
        } catch (err) {
            next(err)
        }
    }

    signOut = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers['authorization']
            const [, token] = authHeader && authHeader.split(' ')
            await this.userService.signOut(req.userId, token)
            res.send(new ResponseWrapper(true, Success.SignOut, null))
        } catch (err) {
            next(err)
        }
    }

    getProfile = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await this.userService.getProfile(req.userId)
            res.send(new ResponseWrapper(user, null, null))
        } catch (err) {
            next(err)
        }
    }

    pushNotification = async (
        req: BodyRequest<PushNotificationRequestDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const params =
                PushNotificationRequestDTO.toPushNotificationRequestDTO(req)
            params.userId = req.userId
            await this.userService.pushNotification(params)
            res.send(new ResponseWrapper(true, null, null))
        } catch (err) {
            next(err)
        }
    }
}
