import { NextFunction, Response } from 'express'
import { ResponseWrapper } from '../../helpers/response.wrapper'
import { AuthRequest, AuthService } from '../auth/auth.service'
import { BodyRequest } from '../base/base.request'
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
            const token = await this.authService.signToken(user.userId)
            user.accessToken = token
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
            const token = await this.authService.signToken(user.userId)

            user.accessToken = token
            res.send(new ResponseWrapper(user, null, null))
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
}
