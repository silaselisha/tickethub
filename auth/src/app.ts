import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import 'express-async-errors'
dotenv.config()

import authRouter from './routes/index'
import errorHandler from './middlewares'
import NotFound from './errors/notfound'
import cookieSession from 'cookie-session'

const app = express()
app.set('trust proxy', true)
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieSession({
    secure: process.env.NODE_ENV !== 'test',
    signed: false,
    secret: process.env.jwtsecret
}))
/**
 * @TODO 
 * ** Route mounting
 */
app.use('/api/v1/users', authRouter)

app.all('*', () => {
    throw new NotFound()
})

app.use(errorHandler)

export default app