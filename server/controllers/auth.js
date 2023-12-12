const User =require('../models/user')
const jwt = require('jsonwebtoken')

exports.signup= async (req,res)=>{
    try {
        const {username,password}=req.body;
        const newUser= new User({username,password});
        await newUser.save();

        const token= jwt.sign({ userId:newUser._id },'secret-key',{expiresIn:'1h'})
        res.json({user:newUser,token})

    } catch (error) {
        res.status(500).json({error:'internal server error'})
        
    }
};


exports.login