import { Queue } from 'bullmq'
import axios from 'axios'
import { Config } from '../../configs'
import { SendNotificationDTO } from './notification.dto'

export class NotificationService {
    config: Config
    queue: Queue
    constructor(config: Config, queue: Queue) {
        this.config = config
        this.queue = queue
    }
    sendNotification = async (params: SendNotificationDTO) => {
        const data = {
            notification: {
                title: params.title,
                body: params.body,
                click_action: params.click_action,
            },
            registration_ids: params.fcm_tokens,
        }
      
        await axios.post(this.config.fcmUri, JSON.stringify(data), {
            headers: {
                Authorization: 'key=' + this.config.fcmServerKey,
                'Content-Type': 'application/json',
            },
        })
    }

    sendNotificationToQueue = async (params: SendNotificationDTO) => {
        await this.queue.add('notification', params)
    }
}
