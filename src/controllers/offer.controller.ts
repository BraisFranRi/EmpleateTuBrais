import { OfferService } from '../services/offer.service'
import {Response, Request, NextFunction} from 'express'

export class OfferController{

    static async getAll(req:Request, res:Response, next:NextFunction){
        try{
            const offers = await OfferService.getAll()
            res.status(200).json(offers)
        }catch(error){
            next(error)
        }
    }

    static async getById(req:Request, res:Response, next:NextFunction){
        try{
            const offerId = req.body.offer.id
            const offer = await OfferService.getById(offerId)
            res.status(200).json(offer)
        }catch(error){
            next(error)
        }
    }

    static async save(req:Request, res:Response, next:NextFunction){
        try{
            const offerData = req.body
            const newOffer = await OfferService.save(offerData)
            res.status(201).json({message: 'User register successfully', newOffer})
        }catch(error){
            next(error)
        }
    }

    static async delete(req:Request, res:Response, next:NextFunction){
        try{
            const offerData = req.body
            await OfferService.delete(offerData)
            res.status(201).json({message: 'Offer deleted successfully'})   
        }catch(error){
            next(error)
        }
    }

    static async update(req:Request, res:Response, next:NextFunction){
        try{
            const offerData = req.body
            const newOffer = await OfferService.update(offerData)
        }catch(error){
            next(error)
        }
    }

    static async rate(req:Request, res:Response, next:NextFunction){
        const offerData = req.body
        const userId = req.cookies.token.id
        const newRate = await OfferService.rate(offerData,userId)
    }

    static async getRate(req:Request, res:Response, next:NextFunction){
        console.log('Get all offers')
    }
}