import { HttpException } from '../exceptions/httpException'
import { OfferService } from '../services/offer.service'
import {Response, Request, NextFunction} from 'express'

export class OfferController{

    static async getAll(req:Request, res:Response, next:NextFunction){
        try{
            const {title} = req.params
            const offers = await OfferService.getAll(title as string)
            res.status(200).json(offers)
        }catch(error){
            next(error)
        }
    }

    static async getById(req:Request, res:Response, next:NextFunction){
        try{
            const offerId = Number.parseInt(req.params.id)
            if (isNaN(offerId)) throw new HttpException(400, "Invalid offer ID");

            const offer = await OfferService.getById(offerId)
            res.status(200).json(offer)
        }catch(error){
            next(error)
        }
    }

    static async save(req:Request, res:Response, next:NextFunction){
        try{
            const offerData = req.body
            const userId = req.user?.id
            if(!userId) throw new HttpException(400,'User creator ID is required') 
            
            const newOffer = await OfferService.save(userId,offerData)
            res.status(201).json({message: 'Offer created successfully', newOffer})
        }catch(error){
            next(error)
        }
    }

    static async delete(req:Request, res:Response, next:NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            if(isNaN(id)) throw new HttpException(400,'Invalid offer ID')

            const deletedOffer = await OfferService.delete(id)
            res.status(201).json(deletedOffer)   
        }catch(error){
            next(error)
        }
    }

    static async update(req:Request, res:Response, next:NextFunction){
        try{
            const offerData = req.body
            const id = Number.parseInt(req.params.id)
            if(isNaN(id)) throw new HttpException(400,'Invalid Offer ID')

            const newOffer = await OfferService.update(id,offerData)
            res.status(200).json(newOffer)
        }catch(error){
            next(error)
        }
    }

    static async rate(req:Request, res:Response, next:NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            if(isNaN(id)) throw new HttpException(400,'Invalid offer ID')
                
            const {value} = req.body
            const userId = req.user.id
            if(!userId) throw new HttpException(400, 'User creator ID is required')

            await OfferService.rate(userId, id, value)
            res.status(200).json({message: 'Offer rate succesfully'})
        }catch(error){
            next(error)
        }
    }

    static async getRate(req:Request, res:Response, next:NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            if(isNaN(id)) throw new HttpException(400, "Invalid offer ID");

            await OfferService.getRate(id)
            res.status(200).json({message: 'Offer rate succesfully'})
        }catch(error){
            next(error)
        }
    }
}