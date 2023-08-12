import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sizes: [
        {
            sizeId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Size"
            },
            price: {
                type: Number,
                required: true
            },
            inStock: {
                type: Number,
                required: true,
            },
        }
    ],
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Brand"

    },
    gender: {
        type: String,
        required: true,
        enum: ['Man', 'Woman', 'Unisex']

    },
    
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Categories"

    },

}, { timestamps: true, versionKey: false });
productSchema.plugin(mongoosePaginate)
productSchema.index({ name: 'text' })
export default mongoose.model("Products", productSchema)
