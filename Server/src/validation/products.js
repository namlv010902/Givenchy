import joi from "joi"

export const validateProduct = joi.object({
    name: joi.string().required().trim(),
    image: joi.string().required().trim(),
    description: joi.string().required().trim(),
    brandId: joi.string().required().trim(),
    gender: joi.string().required().trim(),
    categoryId: joi.string().required().trim(),
    sizes: joi.array().items(
        joi.object({
            _id: joi.any(), 
            sizeId: joi.string().required().trim(),
            price: joi.number().required(),
            inStock: joi.number().required(),
            unitsSold: joi.number().default(0),
        })
    ),
})
