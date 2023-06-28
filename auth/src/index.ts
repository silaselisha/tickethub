import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import authRouter from './routes/index'
import errorHandler from './middlewares'
import databaseConnection from './utils/db'
import NotFound from './errors/notfound'
import cookieSession from 'cookie-session'


const app = express()
app.set('trust proxy', true)
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieSession({
    secure: true,
    signed: true
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
    databaseConnection()
    console.log(`Listening http://localhost:${PORT}/`)
})