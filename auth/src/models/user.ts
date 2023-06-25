import mongoose from 'mongoose'

interface UserAttr {
    email: string;
    password: string;
}

interface UserDoc extends mongoose.Document {
    email: String;
    password: String;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attr: UserAttr): UserDoc
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'provide an email address']
    },
    password: {
        type: String,
        required: [true, 'providea passwoed'],
        trim: true
    }
})

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

userSchema.statics.build = (attr: UserAttr) => {
    return new User(attr)
}

export default User