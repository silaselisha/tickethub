import express, { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import User from '../models/user'
import BadRequestError from '../errors/bad-request-error'
import validateRequestError from '../middlewares/validate-request-error'
import PasswordHashing from '../utils/password-hashing'

const router = express.Router()
/**
 * @TODO 
 * ** handle user login/signup
 * ** retrieve details of the current user
 */

router.route('/signup')
    .post([ body('email').isEmail().withMessage('provide a valid email address!'), body('password').trim().isStrongPassword().withMessage('provide a valid password!')], validateRequestError,async (req: Request, res: Response) => {
        const { email, password } = req.body
        
        const existingUser = await User.findOne({email: email})
      
        if (existingUser) {
          throw new BadRequestError('user with this email address exists')
        }
        
        const user = User.build({
            email,
            password
        })
        await user.save()

        const token = jwt.sign({id: user.id}, process.env.jwtsecret!)
        req.session = {
            jwt: token
        }

        res.status(201).json({
            status: 'success',
            data: user
        })
    })

router.route('/signin')
    .post([body('email').trim().isEmail().withMessage('provide valid email or password'), body('password').trim().notEmpty().withMessage('provide valid email address or password')], validateRequestError, async (req: Request, res: Response) => {
        const { email, password } = req.body
        /**
         * @TODO
         * validate if user exist in the database [email based validation]
         * validate if the password provided is equivalent to the encrypted password
         * Generate a json web token & store it in a cookie session
         */
        const existingUser = await User.findOne({email: email})

        if(!existingUser) {
            throw new BadRequestError('provide valid email address or password')
        }

        const validPassword = await PasswordHashing.toUnHash(existingUser.password as string, password)
     
        if(!validPassword) {
            throw new BadRequestError('provide valid email address or password')
        }

        const token = jwt.sign({id: existingUser.id}, process.env.jwtsecret!)
        req.session = {
            jwt: token
        }

        res.status(200).json({
            status: 'success',
            data: {
                token
            }
        })
    })

router.route('/current-user')
    .get(async (req: Request, res: Response) => {
        /**
         * @TODO
         * Get current logged in user
         */
        if(!req.session?.jwt) {
           return res.status(400).json({
                status: 'failed',
                currentUser: null
            })
        }

        try {
            const token = req.session?.jwt
            const payload = jwt.verify(token, process.env.jwtsecret!) as jwt.JwtPayload
            const user = await User.findById(payload.id)

            res.status(200).json({
                status: 'success',
                data: {
                    id: user?.id,
                    email: user?.email
                }
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                currentUser: null
            })
        }
    })

export default router