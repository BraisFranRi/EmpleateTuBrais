import { HttpException } from "../exceptions/httpException"
import { Offer, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class OfferService {

    static async getAll(){
        return await prisma.offer.findMany()
    }

    static async getById(id:number){
        const findOffer = await prisma.offer.findUnique({where:{id}})
        if(!findOffer) throw new HttpException(404,'Offer not found')
            return findOffer
    }

    static async save(offer:Offer){
        const findOffer = await prisma.offer.findUnique({where:{id: offer.id}})
        if(findOffer) throw new HttpException(409,`Offer ${offer.title} already exists`)
        
        return await prisma.offer.create({data:{...offer}})
    }

    static async delete(offer:Offer){
        const findOffer = await prisma.offer.findUnique({where:{id: offer.id}})
        if(!findOffer) throw new HttpException(404,'Offer not found')
        
        await prisma.offer.delete({where:{id: offer.id}})
    }

    static async update(newOffer:Offer){
        const findOffer = await prisma.offer.findUnique({where:{id: newOffer.id}})
        if(!findOffer) throw new HttpException(404,'Offer not found')

        await prisma.offer.update({where:{id: newOffer.id},data:{...newOffer}})
    }

    static async rate(offerToRate:Offer, userId:number){
        const findOffer = await prisma.offer.findUnique({where:{id: offerToRate.id}})
        if(!findOffer) throw new HttpException(404,'Offer not found')

        
        
    }

} 