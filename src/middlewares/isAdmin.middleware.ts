import {Response, Request, NextFunction} from 'express'

export const isAdmin = (req:Request, res:Response, next:NextFunction):any => {
    const {role} = req.user
    try {
        if(role === 'admin'){
            next()
        }else{
            res.status(403).json({error:'Acces denied'})
        }
    } catch(error) {
        res.status(403).json({error:'Acces denied'})
    }
}