const { getUser } = require("../service/auth");

const checkForAuth= (req,res,next)=>{
    if(!req.cookies){
        req.user=null;
        return next();
    }
    const token= req.cookies?.token;
    if(!token) return next();

    try{
    const user = getUser(token);
      req.user=user;
             } 
    catch(error){}
    next();

}

module.exports=checkForAuth;
