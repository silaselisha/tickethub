import CustomError from "./custom-error";

class NotFound extends CustomError {
    statusCode: number = 404
    
    constructor() {
        super('route not found')
        Object.setPrototypeOf(this, NotFound.prototype)
    }

    serializeError() {
        return [{message: 'Not found'}]
    }
}

export default NotFound