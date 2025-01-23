import { AuthService } from "@/services/auth.service";
import {Response, Request} from 'express'

export class AuthController{
    static async register(req:Request, res:Response){
        try{
            const userData = req.body
            // console.log(userData)
            const newUser = await AuthService.register(userData)
            res.status(201).json({message: 'User register successfully', newUser})
        }catch(error){
            res.status(409).json({message: 'Fallo al registrar al usuario' + error})
        }
    }

    static async login(req:Request, res:Response){
        try{
            const userData = req.body
            // console.log(userData)
            // TO DO -> Comprobar body
            const token = await AuthService.login(userData.email, userData.password)
            // TO DO -> Inyectar una cookie al cliente
            res.status(201).json({message: 'Login successfull', token})
        }catch(error){
            res.status(409).json({message: 'Fallo al logear al usuario'})
        }
    }

}