import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import 'express-async-errors'
dotenv.config()

import authRouter from './routes/index'
import errorHandler from './middlewares'
import databaseConnection from './utils/db'
import NotFound from './errors/notfound'
import cookieSession from 'cookie-session'
import BadRequestError from './errors/bad-request-error'


const app = express()
app.set('trust proxy', true)
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieSession({
    secure: true,
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

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(process.env.jwtsecret)
    if(!process.env.jwtsecret) {
        throw new BadRequestError('Json web token key should be provided')
    }
    databaseConnection()
    console.log(`Listening http://localhost:${PORT}/`)
})