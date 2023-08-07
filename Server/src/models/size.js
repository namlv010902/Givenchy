import mongoose from "mongoose";

const sieSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    productId:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Products"
        }
    ]    

},{timestamps:true, versionKey:false});

export default mongoose.model("Size", sieSchema)