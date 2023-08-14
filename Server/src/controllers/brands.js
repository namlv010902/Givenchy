import Brand from "../models/brands";
import Products from "../models/products"
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
  export const getBrandProducts = async (req, res) => {
    const { _page = 1, _limit = 12 } = req.query
    const options = {
      page: _page,
      limit: _limit,
      populate: [{ path: 'brandId' }, { path: 'categoryId' }, { path: 'sizes.sizeId' }],

    }
    try {
      console.log(req.params.id);
      const products = await Products.paginate({ brandId: req.params.id }, options)
      return res.status(201).json({
        message: "Successfully retrieve products by brand",
        products
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }