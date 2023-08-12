import { Router } from "express"
import { createBrand, getBrand, getBrandProducts } from "../controllers/brands"

const router = Router()
router.post("/brand", createBrand)
router.get("/brand", getBrand)
router.get("/brand/:id", getBrandProducts)
export default router