const mongoose=require('mongoose');

const postSchema=new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            max:350,
            required:true,
        },
        image:{
            type:String,
            default:""
        },
        likes:{
            type:Array,
            default:[]
        }
    },
    {
        timestamps:true,
    }
)

module.exports=mongoose.model("Post", postSchema)