const mongoose = require('mongoose');

const commentSchema=new mongoose.Schema({
    Content:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    }
},{timestamps:true})

const Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;