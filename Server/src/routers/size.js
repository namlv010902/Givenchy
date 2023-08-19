import express, { Router } from "express"
import { createSize, getSizes, productsBySize } from "../controllers/size"
import { checkPermissionAndAuth } from "../middlewares/authorization"
const router = Router()
router.get("/size", getSizes)
router.post("/size", checkPermissionAndAuth, createSize)
router.get("/size/:id", productsBySize)

export default router