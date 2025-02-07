const {Router}=require("express");
const User=require("../Models/user");
const path=require("path");
const multer=require("multer");
const { createTokenforUser } = require("../services/authentication");
const router=Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("Here the file is created");
      cb(null,path.resolve('./public/uploads'));
     
    },
    filename: function (req, file, cb) {
      const filename=`Profile-${Date.now()}-${file.originalname}`;
      cb(null,filename);
    }
  })
  
  const upload = multer({ storage: storage });
router.get("/signup",(req,res)=>{
    res.render("signup");
})

router.get("/signin",(req,res)=>{
    res.render("signin");
})

router.post("/signup",upload.single("ProfileImg"),async(req,res)=>{
    const {username,email,password}=req.body;
    console.log(username);
    const newuser=await User.create({
        username,
        email,
        password,
        profilePicture:`uploads/${req.file.filename}`
    })
    const token=createTokenforUser(newuser);
    const id=newuser._id;
    res.cookie("token",token);
    return res.redirect(`/blog/Addblog`);
})
router.get('/logout',(req,res)=>{
    console.log("Hello my name suraj");
    res.clearCookie("token").redirect("/");
})
router.post("/signin",async(req,res)=>{
    const {email,password}=req.body;
    
    try{
        const user=await User.findOne({email});
        if(!user) throw new Error("Incorrect Email");
        const value=await user.comparePassword(password);  
        console.log(value)
        if(value) 
        {
        const token=createTokenforUser(user);
        console.log(token);
        res.cookie("token",token);
        const id=user.id;
        return res.redirect(`/${id}`);
        }
        else
        {
            throw new Error("Incorrect Password");
        }
    }
    catch(error){
        // console.log(error.message);
        res.render("signin",{
            error:error.message
        })
    } 
    //return res.redirect('/user/signin');
})
module.exports=router;