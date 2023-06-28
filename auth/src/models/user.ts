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
        required: [true, 'providea passwoed'],
        trim: true
    }
})

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

userSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        const hashed = PasswordHashing.toHash(this.get('password'))
        this.set('password', hashed)
    }
    
    next()
})
userSchema.statics.build = (attr: UserAttr) => {
    return new User(attr)
}

const user = User.build({
    email: 'test@test.com',
    password: 'pass1234'
})

export default User