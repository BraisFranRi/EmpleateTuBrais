import { Router } from "express";
import {AuthController} from "@controllers/auth.controller";
import { loginValidator, registerValidator } from "@/middlewares/validator.middleware";
import { ValidationMiddleware } from "@/middlewares/validation.middleware";

const router = Router()

router.post('/login', loginValidator,AuthController.login)
router.post('/register', registerValidator,ValidationMiddleware ,AuthController.register)

export default router