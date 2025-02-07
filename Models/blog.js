// blogModel.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  CoverImage:{
    type:String,
    required:false
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
  }
},{timestamp:true});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
