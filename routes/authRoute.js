const router = require('express').Router();
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

router.post('/register', asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword});
    res.status(200).json(newUser);
}));

router.post('/login', asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json('User not found');
    }

    const validatePassword = await bcrypt.compare(req.body.password, user.password);
    if (!validatePassword) {
        return res.status(400).json('Wrong password');
    }

    res.status(200).json('Login successful');
}));

module.exports = router;
