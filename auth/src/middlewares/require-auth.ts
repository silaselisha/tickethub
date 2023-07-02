import express, { Request, Response, NextFunction } from 'express'
import NotAuthorized from '../errors/not-authorized'

const RequireAuth = (req: Request, res: Response, next: NextFunction) => {
    if(!req.currentUser) {
        throw new NotAuthorized('not authorized, please signup/signin')
    }
    next()
}

export default RequireAuth