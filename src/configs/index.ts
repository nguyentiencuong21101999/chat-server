import dotenv from 'dotenv'

dotenv.config()

const env = process.env

export interface Config {
    port: string
    dbURI: string
    redisURI: string
    secretKey: string

    fcmUri: string
    fcmServerKey: string
    userNameMailer: string
    passwordMailer: string
    clientUrl: string
}

export const configs: Config = {
    port: '4000',
    dbURI: 'mysql://root:AbCd@1234@localhost:3306/chat', //change
    redisURI: 'redis://localhost:6379',
    secretKey: 'zzZA4oMsjw.rzgMVwnrD!PMPHp2RuZe@',
    fcmUri: 'https://fcm.googleapis.com/fcm/send ',
    fcmServerKey:
        'AAAA-oi89b8:APA91bELNkNfKt9mUvaVFQD-R_ILA4mRQSu_vVHOxHMXuUV0zJtthjNdKcu7i4ofb4i60MSAinOUj5pAJVHLM3_dP_6I8EKxwbohk7beJigN_HnmHLq3oIqdWrg9njoNavEMLbxP7c9E',
    userNameMailer: 'chats.21.10.1999@gmail.com',
    passwordMailer: 'tiencuong@123',
    clientUrl: 'http://localhost:3000',
}

export const isProduction = () => {
    return env.NODE_ENV == 'production'
}
