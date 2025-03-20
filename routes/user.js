const {Router} = require("express");
const User = require("../models/user");
const { generateToken } = require("../service/auth");
const router= Router();

router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({"msg": "Successfully logged Out"});
})

router.post('/signup',async (req,res)=>{
    const {name,email,password}= req.body;

    if(!name || !email || !password){
        return res.status(403).json({"msg":"Missing Credentials"});
    }
    const existing = await User.findOne({email});
    console.log(existing);
    if(existing) return res.status(404).json({"msg":"User already exists"});

    const user = new User({ name, email, password });
    await user.save();
    const token= generateToken(user);
    res.cookie('token',token);


    return res.status(200).json({"msg": "Successfully Created"});
})


router.post('/signin',async (req,res)=>{
  const {email,password} = req.body;
  if(!email) return res.status(400).json({"msg":"Missing Credentials"});
  const user = await User.findOne({email});
  if(!user) return res.status(400).json({"msg":"NO user available"});

  const token= User.matchPassword(user,password);
 if(!token) return res.status(400).json({'msg': " wrong credentials"});

 res.cookie('token',token);
 return res.status(200).json({'msg': "successfulll"});
   
})


module.exports= router;