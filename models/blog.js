const {Schema} = require("mongoose");
const mongoose= require("mongoose");


const blogSchema= new Schema({
    title:{
        type: String,
        required: true,

    },
    body: {
        type:String,
        required: true,
    },
    coverImage:{
        type:String,
        
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Blog  = mongoose.model('Blog',blogSchema);

module.exports=Blog;