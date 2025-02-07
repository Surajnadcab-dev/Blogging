const {Router}=require("express");
const mongoose=require("mongoose");
const Blog=require("../Models/blog");
const path=require("path");
const multer=require("multer");
const Comments = require("../Models/comment");
const router=Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.resolve('./public/uploads'));
    },
    filename: function (req, file, cb) {
      const filename=`${Date.now()}-${file.originalname}`;
      cb(null,filename);
    }
  })
  
  const upload = multer({ storage: storage });
  
router.get("/Addblog",(req,res)=>{
    res.render("Addblog",{
        user:req.user,
    })
})
router.post("/:id/Addblog",upload.single("myfile"),async(req,res)=>{
    const {Title,Author,Body}=req.body;
    console.log(Title);
    console.log(Author);
    console.log(Body);
    await Blog.create({
        title:Title,
        author:Author,
        content:Body,
        createdBy:req.params.id,
        CoverImage:`uploads/${req.file.filename}`
    })
    res.redirect(`/${req.params.id}`);
    console.log(req.user._id);
})
router.get('/:id',async(req,res)=>{
  const bid=mongoose.Types.ObjectId.isValid(req.params.id);
  console.log(bid);
  try{
    const blog=await Blog.findById(req.params.id).populate("createdBy");
    const blogComment=await Comments.find({blogId:req.params.id}).populate("createdBy");
    console.log(blogComment);
    return res.render("blogPage",{
     user:req.user,
     blog:blog,
     blogComment
    })
  }
  catch(error)
  {
    //console.log(error.message);
  }
})
router.post("/Comment/:id",async(req,res)=>{
  try{
  const blogComments=await Blog.findById(req.params.id);
  console.log(Blog);
  const comment=await Comments.create({
    Content:req.body.Comment,
    createdBy:req.user._id,
    blogId:req.params.id
  })
  }
  catch(error)
  {
 console.log(error.message);
  }
  
  return res.redirect(`/blog/${req.params.id}`);
})
module.exports=router;