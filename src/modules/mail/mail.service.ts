import { Queue } from 'bullmq'
import fs from 'fs'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { Config, configs } from '../../configs'

export const MAIL_CHAT = 'chat'

export class MailService {
    config: Config
    transporter: nodemailer.Transporter
    queue: Queue

    constructor(config: Config, queue: Queue) {
        this.config = config
        this.transporter = nodemailer.createTransport(
            `smtps://chats.21.10.1999%40gmail.com:${configs.passwordMailer}@smtp.gmail.com`
        )
        this.queue = queue
    }

    sendMail = (msg: Mail.Options) =>
        new Promise((resolve, reject) => {
            console.log(msg)
            this.transporter.sendMail(msg, (err, info) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(info)
            })
        })

    sendMailToQueue = async (msg: Mail.Options) => {
        await this.queue.add('mail', msg)
    }

    readTemplate = (name: string) =>
        new Promise<string>((resolve, reject) => {
            fs.readFile(
                `src/modules/mail/template/${name}.html`,
                (err, data) => {
                    if (err) return reject(err)
                    resolve(data.toString())
                }
            )
        })
}
