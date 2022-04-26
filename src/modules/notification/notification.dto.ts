export interface SendNotificationDTO {
    title: string
    body: string
    fcm_tokens: string[]
}

export interface PushNotificationRequestDTO {
    deviceCode: string
    tokenFireBase?: string
    userId: number
}
