import Size from "../models/size";

export const createSize = async (req, res) => {
    try {
      const size = await Size.create({ name: req.body.name })
  
      return res.status(201).json({
        message: "Size created successfully",
        size
      })
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      })
    }
  }
  
  export const getSizes = async (req, res) => {
    try {
      const size = await Size.find()
  
      return res.status(201).json({
        message: "Get sizes successfully",
        size
      })
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      })
    }
  }
  