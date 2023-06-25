import { ValidationError } from 'express-validator'

class RequestValidatorError extends Error {
    public statusCode: number = 400
    constructor(public errors: ValidationError[]) {
        super()
        Object.setPrototypeOf(this, RequestValidatorError.prototype)
    }

    serializeError() {
       let formattedError = this.errors.map((value) => {
            if(value.type === 'field') {
                return {
                    message: value.msg,
                    field: value.path
                }
            }
            return {message: value.msg}
       })

       return formattedError
    }
}

export default RequestValidatorError