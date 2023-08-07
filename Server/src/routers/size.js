import express, { Router } from "express"
import { createSize, getSizes } from "../controllers/size"

const router = Router()
router.get("/size", getSizes)
router.post("/size", createSize)

export default router