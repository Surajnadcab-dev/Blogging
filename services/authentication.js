const JWT=require("jsonwebtoken");
const secret="$suraj@5556";
function createTokenforUser(user){
  console.log(user);
    const payload={
       _id:user._id,
       email:user.email,
       Uname:user.username,
       profileImageURL:user.profileImageURL,
    }
    const token=JWT.sign(payload,secret);
    return token;
}
function validateToken(token){
  const payload=JWT.verify(token,secret);
  return payload;
}

module.exports={
    createTokenforUser,validateToken
}