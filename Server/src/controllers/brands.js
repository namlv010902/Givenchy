import Brand from "../models/brands";

export const createBrand = async (req, res) => {
    try {
      const brand = await Brand.create({ name: req.body.name })
  
      return res.status(201).json({
        message: "Brand created successfully",
        brand
      })
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      })
    }
  }
  
  export const getBrand = async (req, res) => {
    try {
      const brand = await Brand.find()
  
      return res.status(201).json({
        message: "Get brand successfully",
        brand
      })
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      })
    }
  }
  