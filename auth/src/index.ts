import app from './app'
import BadRequestError from './errors/bad-request-error'
import databaseConnection from './utils/db'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    if(!process.env.jwtsecret) {
        throw new BadRequestError('Json web token key should be provided')
    }
    databaseConnection()
    console.log(`Listening http://localhost:${PORT}/`)
})