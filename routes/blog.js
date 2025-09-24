const express = require("express");
const blog = express.Router();
const middlewareAuth = require("../middleware/middlewareAuth");
const blogmodel = require("../model/blog");
const jwt = require("jsonwebtoken");


blog.get("/", async (req, res) => {
    try {
        const finddata = await blogmodel.find();
        let token = req.cookies.token;
        if (token == "undefined") {
            token = undefined;
        }
        if (token != undefined) {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            res.render("index", { finddata, user });
        } else {
            const user = undefined;
            res.render("index", { finddata, user });
        }
    } catch (err) {
        res.status(404).redirect("/login");
    }


})
blog.get("/profile", middlewareAuth, async (req, res) => {
    try{
        const user = req.user;
        const findcontent = await blogmodel.find({ userid: user._id });

        res.render("profile", { user, findcontent });
    }catch(err){
        res.status(404).redirect("/profile");
    }
    
})
blog.get("/edits/:id", async (req, res) => {
    try{
        const finddata = await blogmodel.findOne({ _id: req.params.id });
        res.render("edit", { finddata });
    }catch(err){
        res.status(404).redirect("/profile");
    }
    
})

blog.get("/profile/:id", async (req, res) => {
    try{
        await blogmodel.deleteOne({ _id: req.params.id });
        res.redirect("/profile");
    }catch(err){
        res.status(404).redirect("/profile");
    }
    
})

blog.post("/update-post/:id", async (req, res) => {
    try{
        const { title, content } = req.body;
        const updatedata = await blogmodel.findOneAndUpdate({ _id: req.params.id }, { title, content }, { new: true });
        res.redirect("/profile");
    }catch(err){
        res.status.redirect("/profile")
    }
    
})

blog.post("/create-post", middlewareAuth,async (req, res) => {
    try{
        const { title, content } = req.body;
        const { _id } = req.user;
        const createcontent = blogmodel({
             title,
            content
        });
         const response = await createcontent.save();
        response.userid = _id;
        response.save();
        res.redirect("/profile");
    }catch(err){
        res.status(404).redirect("/profile");
    }
    
    
})
blog.post("/like/:id", middlewareAuth, async (req, res) => {
    try {
        const finddata = await blogmodel.findOne({ _id: req.params.id });
        const user = req.user._id;
        const finduser = finddata.like;
        if (finduser.indexOf(user) != -1) {
            finddata.like.pop(user);
            await finddata.save();
            res.redirect("/");
        } else {
            finddata.like.push(user);
            await finddata.save();
            res.redirect("/");
        }
    }catch(err){
        res.status(404).redirect("/");
    }
    
    
})
module.exports = blog;