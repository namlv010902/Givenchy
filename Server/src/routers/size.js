import express, { Router } from "express"
import { createSize, getSizes,productsBySize } from "../controllers/size"

const router = Router()
router.get("/size", getSizes)
router.post("/size", createSize)
router.get("/size/:id", productsBySize)

export default router