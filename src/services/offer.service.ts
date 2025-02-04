import { prisma } from "../database/database"
import { HttpException } from "../exceptions/httpException"
import { Offer } from "@prisma/client"


export class OfferService {

    // localhost:3000/api/offer/?title=dam
    static async getAll(title:string = ''){
        return await prisma.offer.findMany({
            where: title?{
                title:{
                    contains: title
                }
            } : {},
            orderBy:{
                createdAt: 'desc'
            },
            take: 100
        })
    }

    static async getById(id:number){
        const findOffer = await prisma.offer.findUnique({where:{id}})
        if(!findOffer) throw new HttpException(404,'Offer not found')
            return findOffer
    }

    static async save(idUser:number,offer:Offer){        
        return await prisma.offer.create({data:{...offer,idUserCreator: idUser}}) 
    }
    
    static async update(id:number,newOffer:Offer){
        const findOffer = await prisma.offer.findUnique({where:{id}})
        if(!findOffer) throw new HttpException(404, 'Offer does not exists')
            
        await prisma.offer.update({where:{id},data:{...newOffer}})
    }

    static async delete(id:number){
        await prisma.offer.delete({where:{id}})
    }
        
    static async rate(offerToRate:Offer, userId:number){
        const findOffer = await prisma.offer.findUnique({where:{id: offerToRate.id}})
        if(!findOffer) throw new HttpException(404,'Offer not found')
        
    }

} 