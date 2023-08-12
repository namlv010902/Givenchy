import Category from "../models/categories"
import Products from "../models/products"

export const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body)
        return res.status(201).json({
            message: "Create category successfully",
            category
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
export const getAllCategory = async (req, res) => {
    try {
        const category = await Category.find()
        return res.status(201).json({
            message: "Get all category successfully",
            category
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
export const getOneCategory = async (req, res) => {

    try {
        const category = await Category.findById(req.params.id).populate("subCategoryId")

        return res.status(201).json({
            message: "Get one category successfully",
            category,

        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
export const categoryProducts = async (req, res) => {
    const { _page = 1, _limit = 12 } = req.query
    const options = {
      page: _page,
      limit: _limit,
    }
    try {
      console.log(req.params.idCate);
      const products = await Products.paginate({ categoryId: req.params.idCate }, options)
      return res.status(201).json({
        message: "Get categoryP successfully",
        products
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }