const Comment = require("../models/Comment")
const Video = require("../controllers/video")
const { createError } = require("../error")


const addComment = async (req, res, next) => {
    const newComment = new Comment({...req.body, userId:req.user.id
      
    });
    console.log(newComment)
    try {
      const savedComment = await newComment.save();
      res.status(200).send(savedComment);
      
    } catch (err) {
      next(err);
    }
  };

  const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return next(createError(404, "Comment not found"));
        }

        if (req.user.id.toString() === comment.userId.toString()) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("The comment has been deleted");
        } else {
            return next(createError(403, "You can delete only your comment!"));
        }
    } catch (err) {
        next(err);
    }
};

const getComments = async (req,res,next)=>{
    try{
        const comments = await Comment.find({videoId:req.params.videoId})
        res.status(200).json(comments)
    }catch(err){
        next(err);
    }
}

module.exports = {addComment,deleteComment,getComments}