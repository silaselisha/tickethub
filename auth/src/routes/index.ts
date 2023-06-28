import express, { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import DatabaseConnectionError from '../errors/database-connection-error'
import RequestValidatorError from '../errors/request-validator-error'
import jwt from 'jsonwebtoken'

import User from '../models/user'
import BadRequestError from '../errors/bad-request-error'

const router = express.Router()
/**
 * @TODO 
 * ** handle user login/signup
 * ** retrieve details of the current user
 */

router.route('/sign-up')
    .post([ body('email').isEmail().withMessage('provide a valid email address!'), body('password').trim().isStrongPassword().withMessage('provide a valid password!')], async (req: Request, res: Response) => {
        const { email, password } = req.body
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            throw new RequestValidatorError(errors.array())
        }

        const user = await User.findOne({email: email})
        if (user) {
          throw new BadRequestError('user with this email address exists')
        }

        const newUser = User.build({
            email: email,
            password: password
        })

        await newUser.save()
        const token = jwt.sign({
            id: newUser.id,
            email: newUser.email
        }, process.env.JWT_KEY!)

        req.session = {
            jwt: token
        }
        
        res.status(200).json({
            status: 'success',
            data: newUser
        })
    })

export default router