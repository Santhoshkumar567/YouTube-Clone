const express = require("express");
const {test} = require("../controllers/user")
const router = express.Router()
const {updateUser,deleteUser,getUser,subscribe,like,dislike,unsubscribe,getUserWithVideos} = require("../controllers/user")
const {verifyToken} = require("../verifyToken")
//update  user

router.put("/:id", verifyToken, updateUser)

//delete user

router.delete("/:id" ,verifyToken, deleteUser)

//get a user

router.get("/find/:id", getUser)

//subscribe a user

router.put("/sub/:id", verifyToken,subscribe)

//unsubcribe a user

router.put("/unsub/:id", verifyToken,unsubscribe)

//like a video

router.put("/like/:videoId", verifyToken,like)

//dislike a video

router.put("/dislike/:videoId", verifyToken,dislike)

//getUserwithVideos

router.get("/userdetails/:id", verifyToken, getUserWithVideos);

//get user Liked videos


module.exports = router;