import { Router } from "express";
import {UserController} from "@controllers/user.controller";
import { isAuthenticate } from "@/middlewares/auth.middleware";

const router = Router()

router.get('/profile', isAuthenticate, UserController.profile)
router.get('/', isAuthenticate, UserController.profile)
// Mostrar lista de todos los usuarios
// Debes estar logeado y ser un ADMIN
// Añadir rutas, controller, service y middleware necesario


export default router