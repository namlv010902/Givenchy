import Comment from "../models/comments";
export const createComment =async(req, res)=>{
 try {
    const comment = await Comment.create(req.body)
    return res.status(200).json({
        message:"Comment created",
        comment
    })
 } catch (error) {
    return res.status(400).json({
        message: error.message, 
      });
 }

}
export const getCommentProduct =async(req, res)=>{
    try {
       const comment = await Comment.find({productId: req.params.idProduct}).populate("userId")
       return res.status(200).json({
           message:"Get comment successfully",
           comment
       })
    } catch (error) {
       return res.status(400).json({
           message: error.message, 
         });
    }
   
   }