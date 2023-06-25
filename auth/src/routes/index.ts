import express, { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import DatabaseConnectionError from '../errors/database-connection-error'
import RequestValidatorError from '../errors/request-validator-error'

const router = express.Router()
/**
 * @TODO 
 * ** handle user login/signup
 * ** retrieve details of the current user
 */

router.route('/sign-up')
    .post([ body('email').isEmail().withMessage('provide a valid email address!'), body('password').trim().isStrongPassword().withMessage('provide a valid password!')], (req: Request, res: Response) => {
        const { email, password } = req.body
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            throw new RequestValidatorError(errors.array())
        }

        res.status(200).json({
            status: 'success',
            data: {
               email,
               password
            }
        })
    })

export default router