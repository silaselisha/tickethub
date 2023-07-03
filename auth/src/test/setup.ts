import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

let mongod: any
beforeAll(async () => {
    mongod = await MongoMemoryServer.create()
    const mongoUri = mongod.getUri()

    await mongoose.connect(mongoUri, {dbName: 'ticketinghub'})
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()

    for(let collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async () => {
    await mongod.stop()
    await mongoose.connection.close()
})
