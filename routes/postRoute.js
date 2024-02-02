const router=require('express').Router()
const asyncHandler=require('express-async-handler')

const User=require('../models/userModel')
const Post=require('../models/postModel')

//Create a post
router.post("/", asyncHandler(async(req, res)=>{
    const newPost=new Post(req.body)
    try {
        const createPost=await newPost.save()
        res.status(200).send({message:"Post created successfully!", createPost})
    } catch (error) {
       res.send(500).send({message:"Server Error"}) 
    }
}))

//Update post
router.put("/:id", asyncHandler(async(req, res)=>{
    const post=await Post.findById(req.params.id)
    try {
        if(req.body.userId===post.userId){
            const updatePost=await Post.updateOne({$set:req.body})
            res.status(200).send({message:"Post updated successfully!", updatePost})
        }
        else{
            return res.status(403).send({message:"You can update only your post"})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}))

//Delete post
router.delete("/:id", asyncHandler(async(req,res)=>{
    const post=await Post.findById(req.params.id)
    try{
        if(req.body.userId===post.UserId){
            const deletePost=await Post.deleteOne()
            res.status(200).send({message:"Post deleted successfully!", deletePost})
        }
        else{
            return res.status(403).send({message:"You can delete only your post"})
        }
    }
    catch(error){
        res.status(500).send({message:"Server Error"})
    }
}))

//Like a post
router.put("/:id/like", asyncHandler(async(req, res)=>{
    const post=await Post.findById(req.params.id)
    try {
        if(post.likes.includes(req.body.userId)){
            const dislikePost=await Post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).send({message:"Post disliked successfully!", dislikePost})
        }
        else{
            const likePost=await Post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).send({message:"Post unliked successfully!", likePost})
        }
    } catch (error) {
        res.status(500).send({message:"Server Error"})
    }
}))

//Get a post
router.get("/:id", asyncHandler(async(req, res)=>{
    const post=await Post.findById(req.params.id)
    try {
        res.status(200).send({message:"Post found successfully!", post})
    } catch (error) {
        res.status(500).send({message:"Server Error"})
    }
}))

//Get post of ur follwing
router.get("/timeline/all", asyncHandler(async(req,res)=>{
    try {
        const currentUser=await User.findById(req.body.userId)
        const currentUserPosts=await Post.find({userId:currentUser._id})
        const friendPosts=await Promise.all(
            currentUser.following.map((friendId)=>{
                return Post.find({userId:friendId})
            })
        )
        res.status(200).json({currentUserPosts, friendPosts}) 
    } catch (error) {
        res.status(500).send({message:"Server Error"})
    }
}))

module.exports=router;