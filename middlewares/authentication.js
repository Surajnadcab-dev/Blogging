const { validateToken } = require("../services/authentication");

function UserAuthenticationCookie(cookieName){
    return (req,res,next)=>{
      const tokencookie=req.cookies[cookieName];
      console.log("Token is :".tokencookie);
      if(!tokencookie)
      {
      console.log("Hello Idhar Dekho");  
      }
      try{
      const UserPayload=validateToken(tokencookie);
      console.log("Hello Sirji");
      req.user=UserPayload;
      }
      catch(error){
        console.log(error);
      }
      next();
    }
}
module.exports=UserAuthenticationCookie;