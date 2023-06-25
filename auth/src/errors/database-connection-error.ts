import CustomError from "./custom-error"

class DatabaseConnectionError extends CustomError {
    public result: string = 'database connection failed!'
    public statusCode: number = 500
    constructor() {
        super('database connection failed')
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeError() {
        return [
            {
               message: this.result
            }
        ]
    }
}

export default DatabaseConnectionError