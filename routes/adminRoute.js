
const express=require("express");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
// const { Admin } =require ("../models/college");
const Admin = require("../models/admin");
   const router =express.Router();
     
    router.post("/login", async(req,res) => {
        try{
            const {email,password} =req.body;
            const admin =await Admin.findOne({ email });

            if(!admin) return res.status(400).json({message:"Invalid credentials"});
// comparing
            const isMatch =await bcrypt.compare(password, admin.password);
              if(!isMatch) return res.status(400).json({ message: "Invalid credentials"});
        
         const token =jwt.sign({ id:admin._id}, process.env.JWT_SECRET,{ expiresIn: "1h"});

 // Redirecting to Gmail-

    return res.json({ success:true, 
        token,
        message:" Login successful !!",
        redirectTo:"https://mail.google.com/mail/u/0/#inbox"});
        // res.json({ token, adminId:admin._id});

            } catch(error){
                res.status(500).json({message:"Server Error", error});
            }
    });
     module.exports =router;