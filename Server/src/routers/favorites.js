import express  from "express";
import { checkFavorite, createFavorite, getFavorite, getFavoriteUser, removeFavorite } from "../controllers/favorites";

const router = express.Router()

router.post("/favorite",createFavorite)
router.post("/favorite-remove",removeFavorite)
router.post("/favorite-check",checkFavorite)
router.get("/favorite/:id",getFavorite)
router.get("/favorite-user/:id",getFavoriteUser)


export default router