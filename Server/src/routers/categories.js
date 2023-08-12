import express  from "express";
import { categoryProducts, createCategory, getAllCategory, getOneCategory } from "../controllers/categories";

const router = express.Router()

router.post("/categories",createCategory)
router.get("/categories",getAllCategory)
router.get("/categories/:id",getOneCategory)
router.get("/categoryProducts/:idCate", categoryProducts)
export default router