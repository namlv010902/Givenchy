import express  from "express";
import { createComment, getCommentProduct } from "../controllers/comments";
import authenticate from "../middlewares/authenticate";

const router = express.Router()

router.post("/comment",authenticate,createComment)
router.get("/comment/:idProduct",getCommentProduct)


export default router