import express  from "express";
import {  forgotPassword, sendForgotPasswordEmail, verifyTokenEmail, updateProfile, changePassword, getProfile  } from "../controllers/users";
import { authenticateEmailToken } from "../middlewares/verifyEmailToken";
import authenticate from "../middlewares/authenticate";

const router = express.Router()

router.patch("/profile",authenticate,updateProfile)
router.get("/profile/",authenticate,getProfile)
router.post("/email",sendForgotPasswordEmail)
router.post("/verifyEmailToken",verifyTokenEmail)
router.patch("/forgotPassword",authenticateEmailToken, forgotPassword)
router.patch("/changePassword",authenticate, changePassword)

export default router