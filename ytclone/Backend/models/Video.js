const mongoose = require("mongoose")

const VideoSchema = new mongoose.Schema({
    userId :{
        type : String,
        required : true,
       
    },
    title : {
        type : String,
        reuired : true,
    },
    desc : {
        type : String,
        required : true,
    },
    imgUrl : {
        type : String,
        reuired : true,
    },
    videoUrl : {
        type : String,
        reuired : true,
    },
    Views : {
        type : Number,
        default : 0,
    },
    tags : {
        type: [String],
        default : []
    },
    likes : {
        type: [String],
        default : []
    },
    dislikes : {
        type: [String],
        default : []
    },


    
},{timestamps:true})

module.exports = mongoose.model("Video",VideoSchema)