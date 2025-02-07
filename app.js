// Import express
require("dotenv").config();
const express = require('express');
const Blog=require("./Models/blog");
const Userroute=require("./routes/user");
const Blogroute=require("./routes/blog");
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");
const UserAuthenticationCookie=require("./middlewares/authentication");

const path = require('path');
// Create an instance of express
const app = express();

// Define a port to listen to
const PORT = process.env.PORT||8000;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("Database is connected")});
app.set('view engine', 'ejs');

// Define the directory where the template files are located
app.set('views', path.resolve("./views"));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));
app.use(UserAuthenticationCookie("token"));
app.use("/user",Userroute);
app.use("/blog",Blogroute);

// Define a route for GET requests to '/'
app.get('/', async(req, res) => {
  const blog=await Blog.find({});
  console.log(blog);
  return res.render("home",{
    user:req.user,
    blog:blog
  });
});
app.get("/:id",async(req,res)=>{
   const Bid=mongoose.Types.ObjectId.isValid(req.params.id);
   console.log("See Hear What is value"+Bid);
  try{
      const bid=req.params.id;
  const blog=await Blog.find({createdBy:bid});
  console.log(blog);
  return res.render("home",{
      user:req.user,
      blog:blog
  })
    }
     catch(error){
    }
})

// Make the server listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
