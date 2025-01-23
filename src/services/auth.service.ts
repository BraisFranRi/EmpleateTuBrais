import { PrismaClient, User } from "@prisma/client"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()
const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass'

export class AuthService{
    static async register(user:User){
        // Comprobar que el usuario no existe
        // SELECT * FROM users WHERE email=users.email
        const findUser = await prisma.user.findUnique({where:{email: user.email}})
        if(findUser) throw new Error(`User ${user.email} already exists`)

        // Encriptar el password
        const passwordEncripted = await bcrypt.hash(user.password, 10)
        user.password=''
        // Guardar el usuario en la bd
        return await prisma.user.create({
            data:{
                ...user,
                password: passwordEncripted,
                role: null

            },
            omit:{
                password:true
            }
        })
    }

    static async login(email:string, password:string){
        // Ver si el usuario existe 
        const findUser = await prisma.user.findUnique({where:{email}})
        if(!findUser) throw new Error(`Invalid user or password`)

        // Ver si el password coincide
        const correctPass = await bcrypt.compare(password, findUser.password)
        if(!correctPass) throw new Error(`Invalid user or password`)
            
        // Generar el token de autenticación
        const token = jwt.sign(
            {id:findUser.id, email:findUser.email, role:findUser.role}, 
            TOKEN_PASSWORD, 
            {expiresIn:"1h"})

        // Devolver el token
        return token
    }

}