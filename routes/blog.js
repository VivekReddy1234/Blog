const {Router}= require("express");
const upload= require("../multer/multer.js");
const route= Router();
const Blog= require('../models/blog.js');


route.get('/',(req,res)=>{
    return res.json({'user': req.user});
});

route.post('/upload',upload.single("image"),async (req,res)=>{
    const user = req.user;
    console.log('user',user);
    console.log("request received");
    console.log(req.body);
    console.log(req.file);
    if(!req.file) return res.status(401).json({'msg': 'image not found'});
    const {title,content} = req.body;
    if(!title || !content){
        return res.status(401).json({'msg': 'Details not found'});
    }
    const response = await Blog.create({
        title: title,
        body: content,
        coverImage : `uploads/${req.file.filename}`,
    });

    return res.status(200).json({'msg' : 'upload successfull'});
})


module.exports= route;