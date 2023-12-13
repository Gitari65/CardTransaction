const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    const token =req.header('Authorization');
    if(!token){
        res.status(401).json({errror:"unauthorized "})
    }
    try {
        const decode=jwt.verify(token,'secret-key');
        req.userId=decode.userId;
        next();
    } catch (error) {

        res.status(401).json({errror:"unauthorized "})
    }
}