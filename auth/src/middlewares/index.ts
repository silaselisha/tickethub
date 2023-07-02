import express, { Request, Response, NextFunction } from 'express'
import DatabaseConnectionError from '../errors/database-connection-error'
import RequestValidatorError from '../errors/request-validator-error'
import CustomError from '../errors/custom-error'

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {

    if(err instanceof CustomError) {
        return res.status(err.statusCode).json({
            status: 'failed',
            errors: err.serializeError()
        })
    }

    res.status(500).json({
        status: 'failed',
        errors: [{
            message: 'internal server error'
        }]
    })
}

export default errorHandler