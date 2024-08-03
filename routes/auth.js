const User = require('../model/users');
const router = require("express").Router();

//Register
router.post('/register', async (req, res) => {
    const newUser =  new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: req.body.passwordHash,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        adress: req.body.adress
    })
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});
//Login
router.post('/login', async (req, res) => {
    try {
        // Find user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored password
        if (req.body.passwordHash !== user.passwordHash) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Authentication successful
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;