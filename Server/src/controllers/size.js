import Products from "../models/products";
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
  export const productsBySize = async (req, res) => {
    const { _page = 1, _limit = 12 } = req.query
    const options = {
      page: _page,
      limit: _limit,
      populate: [{ path: 'brandId' }, { path: 'categoryId' }, { path: 'sizes.sizeId' }],

    }
    try {
      console.log(req.params.id);
     
      const products = await Products.paginate({ "sizes.sizeId": req.params.id }, options)
      return res.status(201).json({
        message: "Successfully retrieve products by size",
        products
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }
  
  