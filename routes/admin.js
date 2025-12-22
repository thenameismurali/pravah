// const mongoose = require("mongoose");
const express =require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const router = express.Router();
router.post('/signup',async(req,res)=>{
    try{
          const { email, password } = req.body;
        if(!email||!password){
            return res.status(400).json({message:"All fields are required"});
        }
        const existingUser =await Admin.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"user already exists"});
        }
        const hashedpassword = await bcrypt.hash(password,10);
        await Admin.create({
            email,
            password:hashedpassword,
            
        });
        res.status(201).json({message:"user registered successfully"});

    }catch(error){
        console.log(error);
res.status(500).json({message:"internal error"});
    }
});
router.post('/signin',async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(401).json({message:"email and password can't be empty"});
        }
        const user =await Admin.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"invalid credentials"});
        }
        const token =jwt.sign({adminId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"none",
            maxAge:24*60*60*1000
        });
        res.status(200).json({message:"Login success"});


    }catch(error){
        console.log(error);
        return res.status(500).json({message:"internal error"});

    }
})
router.post("/logout",(req,res)=>{
    res.clearCookie("token");
    return res.status(200).json({message:"logout success"});
});
module.exports = router;