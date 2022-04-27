import { Queue, Worker } from 'bullmq'
import IORedis from 'ioredis'
import { configs } from '../../configs'
import { SendNotificationDTO } from '../notification/notification.dto'
import { NotificationService } from '../notification/notification.service'

export const NotificationQueueName = 'notification'

const ioRedis = new IORedis(configs.redisURI, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
})

export const notificationQueue = new Queue(NotificationQueueName, {
    connection: ioRedis,
    defaultJobOptions: {
        removeOnComplete: false,
        removeOnFail: 1000,
    },
})

const notificationService = new NotificationService(configs, notificationQueue)

export const notificationWorker = new Worker<SendNotificationDTO>(
    NotificationQueueName,
    async (job) => {
        await notificationService.sendNotification(job.data)
    },
    { connection: ioRedis }
)
