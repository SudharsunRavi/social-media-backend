const mongoose = require('mongoose');

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            min:5,
            max:30
        },
        email:{
            type:String,
            required:true,
            unique:true
        }, 
        password:{
            type:String,
            required:true
        },
        profilePic:{
            type:String,
            default:""
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        followers:{
            type:Array,
            default:[]
        },
        following:{
            type:Array,
            default:[]
        },
        desc:{
            type:String,
            max:50
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model('User', userSchema)