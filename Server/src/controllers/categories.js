import Category from "../models/categories"

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