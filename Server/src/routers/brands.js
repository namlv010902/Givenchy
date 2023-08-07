import { Router } from "express"
import { createBrand, getBrand } from "../controllers/brands"

const router = Router()
router.post("/brand", createBrand)
router.get("/brand", getBrand)
export default router