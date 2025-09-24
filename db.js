const mongoose=require("mongoose");
mongoose.connect(process.env.MONGO_URL,{
     
    serverSelectionTimeoutMS: 5000
});
const db=mongoose.connection;
db.on("connected",()=>{
    console.log("db is Connected");
});
db.on("disconnected",()=>{
    console.log("db is disconnected");
})
db.on("error",()=>{
    console.log("db is error")
})
module.exports=db;