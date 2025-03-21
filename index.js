require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require("./routes/user.js");
const cookieParser= require("cookie-parser");
const checkForAuth = require("./middleware/auth.js");
const blogRoute= require("./routes/blog.js");
const Blog = require('./models/blog.js');
const path = require("path");



mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Database Connected")).catch((err)=> console.log('error',err));
app.use(cors({
    origin:  process.env.FRONTEND_URL || "http://localhost:5173", // Allow only your frontend origin
    credentials: true // Allow cookies and authentication headers
  }))
app.use(express.urlencoded({extended: true}));
// app.use(express.json());
app.use(cookieParser());
app.use(checkForAuth);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());




app.use('/user',userRouter);
app.use('/blog',blogRoute);
app.get('/',async(req,res)=>{
    const allBlogs= await Blog.find({});
    res.json({user: req.user,
        blog: allBlogs
    }); 
})
const port = process.env.PORT  || 9000;
app.listen(port,()=>{
    console.log("Server started successfully");
})