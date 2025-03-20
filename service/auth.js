const jwt =require("jsonwebtoken");

const secret ='vivek';

function generateToken(user){
    const payload={
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileUrl : user.profileUrl,
    }

    const token = jwt.sign(payload,secret);
    return token;
}

function getUser(token){
    const payload= jwt.verify(token,secret);
    return payload;
}

module.exports={
    generateToken,
    getUser,
}