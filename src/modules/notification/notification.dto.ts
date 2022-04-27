import { plainToInstance } from 'class-transformer'

export interface SendNotificationDTO {
    title: string
    body: string
    click_action?: string
    fcm_tokens: string[]
}

export class PushNotificationRequestDTO {
    userName: number
    type: number
    content: string
    userId: number
    static toPushNotificationRequestDTO = (req) => {
        return plainToInstance(PushNotificationRequestDTO, req.body)
    }
}

export enum NotificationType {
    message = 1,
    reaction = 2,
    file = 3,
}
