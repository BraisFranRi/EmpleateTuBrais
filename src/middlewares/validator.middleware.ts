import {body} from 'express-validator'

export const registerValidator = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:4}).withMessage('Password too short'),
    body('name').notEmpty().withMessage('Name required')

]

export const loginValidator = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password required')
]