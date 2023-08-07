import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
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

export default mongoose.model("Brand", brandSchema)