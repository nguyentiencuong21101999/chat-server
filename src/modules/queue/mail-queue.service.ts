import { Queue, Worker } from 'bullmq'
import IORedis from 'ioredis'
import Mail from 'nodemailer/lib/mailer'
import { configs } from '../../configs'

import { MailService } from '../mail/mail.service'

const ioRedis = new IORedis(configs.redisURI, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
})

export const mailQueue = new Queue('mail', {
    connection: ioRedis,
    defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: 1000,
    },
})

const mailService = new MailService(configs, mailQueue)

export const mailWorker = new Worker<Mail.Options>(
    'mail',
    async (job) => {
        await mailService.sendMail(job.data)
    },
    { connection: ioRedis }
)
