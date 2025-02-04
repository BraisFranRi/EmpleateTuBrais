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
            const offerId = Number.parseInt(req.params.id)
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
            res.status(201).json({message: 'Offer created successfully', newOffer})
        }catch(error){
            next(error)
        }
    }

    static async delete(req:Request, res:Response, next:NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            const deletedOffer = await OfferService.delete(id)
            res.status(201).json({message: 'Offer deleted successfully'})   
        }catch(error){
            next(error)
        }
    }

    static async update(req:Request, res:Response, next:NextFunction){
        try{
            const offerData = req.body
            const id = Number.parseInt(req.params.id)
            const newOffer = await OfferService.update(id,offerData)
        }catch(error){
            next(error)
        }
    }

    static async rate(req:Request, res:Response, next:NextFunction){
        try{
            const {value} = req.body
            const id = Number.parseInt(req.params.id)
            const userId = req.body.user.id
            await OfferService.rate(userId, id, value)
            res.status(200).json({message: 'Offer rate succesfully'})
        }catch(error){
            next(error)
        }
    }

    static async getRate(req:Request, res:Response, next:NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            await OfferService.getRate(id)
            res.status(200).json({message: 'Offer rate succesfully'})
        }catch(error){
            next(error)
        }
    }
}