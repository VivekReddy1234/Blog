const mongoose = require("mongoose");
const {createHmac , randomBytes} =  require("node:crypto");
const { generateToken } = require("../service/auth");


const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    salt : {
        type:String,
    },
    password: {
        type: String,
        required: true,

    },
    profileUrl:{
        type: String,
        default:'/images/image.png',
    },
    role:{
        type: String,
        enum: ['ADMIN','USER'],
        default: 'USER'
    }

},{timestamps: true});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    this.salt = randomBytes(16).toString("hex"); // Generate a secure salt
    this.password = createHmac("sha256", this.salt).update(this.password).digest("hex");

    next();
});

userSchema.static('matchPassword',function(user,password){
    const pass = createHmac('sha256',user.salt).update(password).digest('hex');
    if(pass===user.password){
        const token = generateToken(user);
        return token;
    }
    return false;

} );


const User = mongoose.model('User',userSchema);
module.exports= User;