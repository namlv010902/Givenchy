import Favorite from "../models/favorites"

export const createFavorite=async(req, res)=>{
    try {
        const favorite = await Favorite.create(req.body)
        return res.status(201).json({
            message: "Create favorite successfully",
            favorite
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
export const getFavorite=async(req, res)=>{
    try {
        const favorite = await Favorite.find({productId:req.params.id}).populate("productId")
        return res.status(201).json({
            message: "Get favorite successfully",
            favorite
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
export const checkFavorite=async(req, res)=>{
    try {
        const {userId, productId} = req.body
        const favorite = await Favorite.findOne({userId:userId,productId:productId})
        if(!favorite){
            return res.status(401).json({
                message: "Favorite error",
            })
        }
        return res.status(201).json({
            message: "Favorite successfully",
            favorite
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
export const removeFavorite=async(req, res)=>{
    try {
        const {userId, productId} = req.body
        const favorite = await Favorite.findOneAndDelete({userId:userId,productId:productId})
        if(!favorite){
            return res.status(401).json({
                message: "Remove favorite failed",
                favorite
            })
        }
        return res.status(201).json({
            message: "Remove favorite successfully",
            favorite
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
export const getFavoriteUser=async(req, res)=>{
    try {
        const favorites = await Favorite.find({userId:req.params.id}).populate("productId")
        if(!favorites) return res.status(404).json({message:"User not found"})
        return res.status(201).json({
            message: "Get favorite successfully",
            favorites
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}