const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

//Update user
router.put("/:id", asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User Not Found" });
        }

        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateUser) {
            return res.status(500).send({ message: "Error updating user" });
        }

        console.log(req.body.userId)

        res.status(200).send({ message: "User updated successfully!", updateUser });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server Error" });
    }
}));

//Delete user
router.delete("/:id", asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User Not Found" });
        }

        await User.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: "User deleted successfully!" });
    } catch (error) {
        res.status(500).send({ message: "Server Error" });
    }
}));

//Get a particular user
router.get("/:id", asyncHandler(async (req, res) => {
    const user=await User.findById(req.params.id);
    if(!user){
        return res.status(404).send({message:"User Not Found"});
    }
    res.status(200).send({message:"User found successfully!", user});
}))

//Follow a user
router.put("/:id/follow", asyncHandler(async(req, res) => {
    try{
        const currentUser=await User.findById(req.body.userId);
        const userToFollow=await User.findById(req.params.id);
        if(!userToFollow){
            return res.status(404).send({message:"User Not Found"});
        }
        if(userToFollow._id===req.body.userId){
            return res.status(403).send({message:"You cannot follow yourself"});
        }
        if(!currentUser.following.includes(req.params.id)){
            await currentUser.updateOne({$push:{following:req.params.id}});
            await userToFollow.updateOne({$push:{followers:req.body.userId}});
            res.status(200).send({message:"User followed successfully!"});
        }
    } catch (error) {
        res.status(500).send({ message: "Server Error" });
    }
}))

//Unfollow a user
router.put("/:id/unfollow", asyncHandler(async(req, res) => {
    try{
        const currentUser=await User.findById(req.body.userId);
        const userToUnfollow=await User.findById(req.params.id);
        if(!userToUnfollow){
            return res.status(404).send({message:"User Not Found"});
        }
        if(userToUnfollow._id===req.body.userId){
            return res.status(403).send({message:"You cannot unfollow yourself"});
        }
        if(currentUser.following.includes(req.params.id)){
            await currentUser.updateOne({$pull:{following:req.params.id}});
            await userToUnfollow.updateOne({$pull:{followers:req.body.userId}});
            res.status(200).send({message:"User unfollowed successfully!"});
        }
    }
    catch (error) {
        res.status(500).send({ message: "Server Error" });
    }
}))


module.exports = router;