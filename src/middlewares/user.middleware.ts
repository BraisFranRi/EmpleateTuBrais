import {Response, Request, NextFunction} from 'express'
import jwt from "jsonwebtoken"


export const isAdmin = (req:Request, res:Response, next:NextFunction):any => {
    //const token = req.headers.authorization?.split(" ")[1]
    const token = req.cookies.token
    // if(!token) return res.status(401).json({message: 'Access denied'})
    try {
        const {role} = jwt.decode(token) as jwt.JwtPayload
        if(role != 'admin') throw new Error('Acces denied')
        next()
    } catch(error) {
        res.status(403).json({error:'Acces denied'})
    }
}
