import express  from "express";
import authenticate from "../middlewares/authenticate"
import {  createFavorite, getFavorite, getFavoriteUser, removeFavorite } from "../controllers/favorites";

const router = express.Router()

router.post("/favorite",authenticate,createFavorite)
router.post("/favorite-remove",authenticate,removeFavorite)

router.get("/favorite/:id",getFavorite)
router.get("/favorite-user/",authenticate,getFavoriteUser)

export default router