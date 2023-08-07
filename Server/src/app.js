import express from "express";
import mongoose from "mongoose";
import categoryRouter from "./routers/categories"
import productRouter from "./routers/products"
import authRouter from "./routers/auth"
import cartRouter from "./routers/carts"
import orderRouter from "./routers/orders"
import commentRouter from "./routers/comments"
import favoriteRouter from "./routers/favorites"
import uploadRouter from "./routers/upload"
import userRouter from "./routers/users"
import brandRouter from "./routers/brands"
import sizeRouter from "./routers/size"
import cors from "cors"
const app = express();
app.use(cors())
app.use(express.json())
app.use("/api",categoryRouter)
app.use("/api",productRouter)
app.use("/api",authRouter)
app.use("/api",cartRouter)
app.use("/api",orderRouter)
app.use("/api",commentRouter)
app.use("/api",favoriteRouter)
app.use("/api",uploadRouter)
app.use("/api",userRouter)
app.use("/api",sizeRouter)
app.use("/api",brandRouter)
mongoose.connect("mongodb://127.0.0.1:27017/Givenchy")
.then(()=>console.log("kết nối thành công Givenchy"))
.catch((error)=>console.log(error))
export const viteNodeApp = app