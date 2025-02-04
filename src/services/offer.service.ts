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
        
    static async rate(idUser:number, idOffer:number, value:number){

        const findOffer = await prisma.offer.findUnique({where:{id:idOffer}})
        if(!findOffer) throw new HttpException(404, 'Offer does not exists')

        // Poner un middleware
        if(value < 0 || value > 5) throw new HttpException(400, 'Rate value must be between 1 adn 5')

        await prisma.rate.upsert({
            where:{
                idUser_idOffer:{ idUser, idOffer }
            },
            update:{
                value
            },
            create:{
                idUser, idOffer, value
            }
        })
        
    }

    static async getRate(idOffer:number){

        const findOffer = await prisma.offer.findUnique({where:{id:idOffer}})
        if(!findOffer) throw new HttpException(404, 'Offer does not exists')

        const ratingStats = await prisma.rate.aggregate({
            where:{idOffer},
            _avg:{value:true},
            _count:{value:true}
        })

        return {
            totalRatings: ratingStats._count.value,
            averageRatings: ratingStats._avg.value?.toFixed(2)
        }
    }

    static async getMyRate(idUser:number, idOffer: number){
        
        const findOffer = await prisma.offer.findUnique({where:{id:idOffer}})
        if(!findOffer) throw new HttpException(404, 'Offer does not exists')

        return await prisma.rate.findUnique({
            where:{
                idUser_idOffer:{ idUser, idOffer }
            },
            select: {value:true}
        })
    }

} 