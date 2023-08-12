import express  from "express";
import {  forgotPassword, sendForgotPasswordEmail, verifyTokenEmail, getUser, updateProfile  } from "../controllers/users";
import { authenticateEmailToken } from "../middlewares/verifyEmailToken";
import authenticate from "../middlewares/authenticate";

const router = express.Router()

router.patch("/auth/profile",authenticate,updateProfile)
router.get("/auth/user/:id",authenticate,getUser)
router.post("/email",sendForgotPasswordEmail)
router.post("/verifyEmailToken",verifyTokenEmail)
router.patch("/forgotPassword",authenticateEmailToken, forgotPassword)

export default router