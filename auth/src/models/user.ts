import mongoose from 'mongoose'
import PasswordHashing from '../utils/password-hashing';

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
        required: [true, 'provide a password'],
        trim: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            const id: string = ret._id
            ret.id = id
            delete ret._id
            delete ret.password
            delete ret.__v
        }
    }
})

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        const hashed = await PasswordHashing.toHash(this.get('password'))
        this.set('password', hashed)
    }
    
    next()
})
userSchema.statics.build = (attr: UserAttr) => {
    return new User(attr)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export default User