import { Expose } from 'class-transformer'

export class UserDeviceDTO {
    @Expose()
    userId: number

    @Expose()
    createdBy: number

    @Expose()
    tokenFireBase: string

    @Expose()
    token: string

    @Expose()
    email: string
}
