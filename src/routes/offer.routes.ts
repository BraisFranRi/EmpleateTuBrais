import { Router } from "express";

const router = Router()

// localhost:3000/api/offerts/
// localhost:3000/api/offerts/?title=react&category=DAM
router.get('/', OffertController.getAll) // Listar ofertas
// POST localhost:3000/api/offerts/ {body}
router.get('/:id', OffertController.getById)
router.post('/', OffertController.save) // Añadir oferta (Admins)
// GET localhost:3000/api/offerts/XXXX (Es un parámetro que se manda en la ruta tras el último /)
router.delete('/:id', OffertController.delete) // Borrar una oferta (Admins)
// PUT/PATCH localhost:3000/api/offert/XXXX {body} -> Los datos nuevos y el id de la oferta a cambiar
// PUT -> Actualiza todo || PATCH -> Modifica solo una cosa
router.put('/:id', OffertController.update) // Modificar una oferta 

//POST con id de la oferta valor en el {body}
router.post('/:id/rate/', OffertController.rate) // Calificamos una oferta x  
router.get('/:id/rate/', OfferController.getRate)// Vemos que calificación (total) tiene una oferta?

export default router