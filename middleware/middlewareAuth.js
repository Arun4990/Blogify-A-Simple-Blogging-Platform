const jwt=require("jsonwebtoken");

async function middlewareAuth(req,res,next){
    if(req.cookies.token == undefined){
        return res.redirect("/login");
    }else{
        try{
                const verifytoken=await jwt.verify(req.cookies.token,process.env.JWT_SECRET);
                req.user=verifytoken;
                next();
        }catch(error){
                console.error("Invalid Token",error);
                return res.redirect("/login");
        }
        
    }
    
}
module.exports=middlewareAuth;