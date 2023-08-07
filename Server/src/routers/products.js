import express from "express";
import { createProduct, filterPrice, getAllProduct, getOneProduct, removeProduct, updateProduct, categoryProducts } from "../controllers/products";
import { checkPermissionAndAuth } from "../middlewares/checkPermission";
const router = express.Router()
router.post("/product", createProduct)
router.patch("/product/:id", updateProduct)
router.get("/product/", getAllProduct)
router.get("/product/:id", getOneProduct)
router.delete("/product/:id", checkPermissionAndAuth, removeProduct)
router.post("/productFilter/", filterPrice)
router.get("/categoryProducts/:idCate", categoryProducts)


export default router