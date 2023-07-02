import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user'

declare global {
    namespace Express {
        interface Request {
            currentUser?: jwt.JwtPayload
        }
    }
}

const CurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.session?.jwt) {
        return next()
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.jwtsecret!) as jwt.JwtPayload
        
        const existingUser = await User.findById(payload.id)
        
        const user = {
            id: existingUser?.id,
            email: existingUser?.email
        }
        req.currentUser = user
    } catch (error) { }
    next()
}

export default CurrentUser