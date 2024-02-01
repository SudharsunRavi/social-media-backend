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


module.exports = router;