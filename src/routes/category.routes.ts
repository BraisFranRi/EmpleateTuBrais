import { isAuthenticate } from "@/middlewares/auth.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import { Router } from "express";
import { CategoryController } from "@/controllers/category.controller";
import { categoryValidator } from "../middlewares/validator.middleware";
import { ValidationMiddleware } from "@/middlewares/validation.middleware";


const router = Router()

router.get("/", isAuthenticate, CategoryController.getAll);
router.get("/:id", isAuthenticate, CategoryController.getById);
router.post("/", isAuthenticate,isAdmin, categoryValidator, ValidationMiddleware, CategoryController.create);
router.put("/:id", isAuthenticate,isAdmin, categoryValidator, ValidationMiddleware, CategoryController.update);
router.delete("/:id",isAuthenticate,isAdmin,CategoryController.delete); 

export default router