import express from "express";
import { createProduct, filterPrice, getAllProduct, getOneProduct, productsByGender, removeProduct, updateProduct } from "../controllers/products";
import { checkPermissionAndAuth } from "../middlewares/authorization";

const router = express.Router()
router.post("/product", checkPermissionAndAuth, createProduct)
router.patch("/product/:id", checkPermissionAndAuth, updateProduct)
router.get("/product/", getAllProduct)
router.get("/product/:id", getOneProduct)
router.delete("/product/:id", checkPermissionAndAuth, removeProduct)
router.post("/productFilterPrice/", filterPrice)
router.get("/productsByGender/:gender", productsByGender)



export default router