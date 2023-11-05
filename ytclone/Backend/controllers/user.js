const {createError} = require("../error")
const User = require("../models/User")
const Video = require("../models/Video")
const Comment = require("../models/Comment")
const updateUser = async (req,res,next)=>{
 
    if(req.params.id === req.user.id){
        
        console.log(req.user.id)
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set : req.body,
            },
            {new:true}
        );
        res.status(200).json(updatedUser)
        }catch(err){
            next(err)
        }
    }else{
        return next(createError(403, "You can update only your account"))
    }

}
const deleteUser = async (req, res, next) => {
  try {
      // Check if the user is deleting their own account
      if (req.params.id === req.user.id) {
          // Find the user
          const user = await User.findById(req.params.id);
          if (!user) {
              return next(createError(404, "User not found"));
          }

          // Delete the user
          await User.findByIdAndDelete(req.params.id);

          // Delete videos created by the user
          await Video.deleteMany({ userId: req.params.id });

          // Delete comments made by the user
          await Comment.deleteMany({ userId: req.params.id });

          res.status(200).json("User, videos, and comments have been deleted");
      } else {
          return next(createError(403, "You can delete only your account"));
      }
  } catch (err) {
      next(err);
  }
};

const getUser = async (req,res,next)=>{
    try{
        const user= await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
    
}
 const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedusers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successfull.")
  } catch (err) {
    next(err);
  }
};

 const unsubscribe = async (req, res, next) => {
  try {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedusers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });
      res.status(200).json("Unsubscription successfull.")
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
const like = async (req, res, next) => {
  const userId = req.user.id;
  const videoId = req.params.videoId;

  try {
    // Add the videoId to the likedVideos array
    await User.findByIdAndUpdate(userId, {
      $addToSet: { likedVideos: videoId },
    });

    // Update the video's likes
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: userId },
    });

    res.status(200).json("Video liked successfully");
  } catch (err) {
    next(err);
  }
};

const dislike = async (req, res, next) => {
  const userId = req.user.id;
  const videoId = req.params.videoId;

  try {
    // Remove the videoId from the likedVideos array
    await User.findByIdAndUpdate(userId, {
      $pull: { likedVideos: videoId },
    });

    // Update the video's likes
    await Video.findByIdAndUpdate(videoId, {
      $pull: { likes: userId },
    });

    res.status(200).json("Video disliked successfully");
  } catch (err) {
    next(err);
  }
};

const getUserWithVideos = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userDetails = await User.findById(userId);

    if (!userDetails) {
      return next(createError(404, "User not found"));
    }

    const userVideos = await Video.find({ userId });

    // Return the user details and their videos
    res.status(200).json({ userDetails, userVideos });
  } catch (err) {
    next(err);
  }
};



module.exports = {updateUser,deleteUser,getUser,subscribe,like,dislike,unsubscribe,getUserWithVideos}