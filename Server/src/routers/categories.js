import express  from "express";
import { createCategory, getAllCategory, getOneCategory } from "../controllers/categories";

const router = express.Router()

router.post("/categories",createCategory)
router.get("/categories",getAllCategory)
router.get("/categories/:id",getOneCategory)

export default router