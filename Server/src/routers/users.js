import express  from "express";
import {  forgotPassword, sendForgotPasswordEmail, verifyTokenEmail, getUser, updateProfile  } from "../controllers/users";
import { authenticateEmailToken } from "../middlewares/verifyEmailToken";

const router = express.Router()

router.patch("/auth/profile",updateProfile)
router.get("/auth/user/:id",getUser)
router.post("/email",sendForgotPasswordEmail)
router.post("/verifyEmailToken",verifyTokenEmail)
router.patch("/forgotPassword",authenticateEmailToken, forgotPassword)

export default router