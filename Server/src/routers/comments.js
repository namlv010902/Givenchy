import express  from "express";
import { createComment, getCommentProduct } from "../controllers/comments";

const router = express.Router()

router.post("/comment",createComment)
router.get("/comment/:idProduct",getCommentProduct)


export default router