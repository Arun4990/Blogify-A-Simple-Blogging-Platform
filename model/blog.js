const mongoose=require("mongoose");
const blogSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }]
})
module.exports=mongoose.model("blog",blogSchema);