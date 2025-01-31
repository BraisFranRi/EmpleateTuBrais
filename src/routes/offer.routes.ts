import { Router } from "express";
import {OfferController} from "../controllers/offer.controller";
import { isAdmin } from "../middlewares/user.middleware";
const router = Router()

// localhost:3000/api/offerts/
// localhost:3000/api/offerts/?title=react&category=DAM
router.get('/', OfferController.getAll) // Listar ofertas
// POST localhost:3000/api/offerts/ {body}
router.get('/:id', OfferController.getById)
router.post('/', isAdmin,OfferController.save) // Añadir oferta (Admins)
// GET localhost:3000/api/offerts/XXXX (Es un parámetro que se manda en la ruta tras el último /)
router.delete('/:id', isAdmin,OfferController.delete) // Borrar una oferta (Admins)
// PUT/PATCH localhost:3000/api/offert/XXXX {body} -> Los datos nuevos y el id de la oferta a cambiar
// PUT -> Actualiza todo || PATCH -> Modifica solo una cosa
router.put('/:id', isAdmin,OfferController.update) // Modificar una oferta 

//POST con id de la oferta valor en el {body}
router.post('/:id/rate/', OfferController.rate) // Calificamos una oferta x  
router.get('/:id/rate/', OfferController.getRate)// Vemos que calificación (total) tiene una oferta?

export default router