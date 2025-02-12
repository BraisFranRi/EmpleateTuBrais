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

export const offerValidator = [
    body('title').isLength({min:4}).withMessage('Title too short'),
    body('description').optional().isLength({max:2000}),
    body('contactEmail').optional().isEmail().withMessage('Invalid email'),
    body('published').optional().isISO8601().toDate().withMessage('Invalid date format'),
    body('expired').isISO8601().toDate().withMessage('Invalid date format')
]

export const categoryValidator = [
    body('name').notEmpty().withMessage('Name required')
]

export const rateValidator = [
    body('value').isInt({min:0,max:5}).toInt().withMessage('Value is required')
]