import { AuthService } from "../services/auth.service";
import {Response, Request, NextFunction} from 'express'

export class AuthController{

    static async register(req:Request, res:Response, next:NextFunction){
        try{
            const userData = req.body
            // console.log(userData)
            const newUser = await AuthService.register(userData)
            res.status(201).json({message: 'User register successfully', newUser})
        }catch(error){
            next(error)
        }
    }

    static async login(req:Request, res:Response, next:NextFunction){
        try{
            const userData = req.body
            // TO DO -> Comprobar body
            const token = await AuthService.login(userData.email, userData.password)
            // TO DO -> Inyectar una cookie al cliente
            res.cookie('token', token,{
                maxAge: 60*60*1000, // 1 Hora de caducidad
                httpOnly: true, // No se puede acceder mediante js
                secure: false, // Solo se envia si usas https
                sameSite: 'strict' // Evita ataques CSRF (Cook)
            })
            res.status(201).json({message: 'Login successfull', token})
        }catch(error){
            next(error)
        }
    }

}