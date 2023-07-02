import CustomError from './custom-error';

class NotAuthorized extends CustomError {
    statusCode: number = 401
    
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, NotAuthorized.prototype)
    }

    serializeError() {
        return [{
            message: this.message
        }]
    }
}

export default NotAuthorized