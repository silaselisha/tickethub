import mongoose from "mongoose";

const databaseConnection = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
        })
        console.log('Database connection established...')
    } catch (error) {
        console.log(error)
    }
}

export default databaseConnection