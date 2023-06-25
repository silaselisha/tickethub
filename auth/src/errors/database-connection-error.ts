class DatabaseConnectionError extends Error {
    public result: string = 'database connection failed!'
    public statusCode: number = 500
    constructor() {
        super()
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