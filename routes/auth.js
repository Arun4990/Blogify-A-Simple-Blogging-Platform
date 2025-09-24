const express=require("express");
const usermodel=require("../model/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const rateLimit=require("express-rate-limit");

const auth=express.Router();
const loginLimiter=rateLimit({
    window:15*60*1000,
    max:5,
    message:"Too many login attempts.Try again in 15 minutes"
})
auth.get("/login",(req,res)=>{
    res.render("login");
});
auth.get("/register",(req,res)=>{
    res.render("register");
});

auth.get("/logout",(req,res)=>{
    
    res.cookie("token",undefined);
    res.redirect("/");
})
auth.post("/register",async(req,res)=>{
    try{
        const {username,name,email,age,phone,password}=req.body;
    const userexist=await usermodel.findOne({email});
    if(userexist){
        return res.json("user already exist").status(500);
    }
    const hashpass=await bcrypt.hash(password,Number(process.env.BCRYPT_SALT || 10));
    const createdata= usermodel({
        username,
        name,
        email,
        age,
        phone,
        password:hashpass
    });
    const response= await createdata.save();
    res.redirect("/login")
    }catch(err){
        res.redirect("/signup");
    }
    

});
auth.post("/login",loginLimiter,async(req,res)=>{
    try{
         const {email,password}=req.body;
    const finduser= await usermodel.findOne({email});
    if(!finduser){
       return res.redirect("/register");
    }
    const passwordCompare=await bcrypt.compare(password,finduser.password);
    const {username,_id}=finduser;
    if(passwordCompare){
        const tokengen=await jwt.sign({email,username,_id},process.env.JWT_SECRET,{ expiresIn: '1h' });
    

        res.cookie("token",tokengen,{
            httpOnly:true,
            secure:process.env.NODE_ENV == "production",
            sameSite:"strict",
            maxAge:3600000
        }).redirect("/profile");
        
    }
    }catch(err){
        res.redirect("/login");

    }
   

});;
module.exports=auth;