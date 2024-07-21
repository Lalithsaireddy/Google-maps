const router = require('express').Router(); // Correctly import Router
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        // Generate salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user with the hashed password
        const newUser = new User({
            username: req.body.username,
            email: req.body.emailtype,
            password: hashedPassword, // Store the hashed password
        });

        // Save the user to the database
        const user = await newUser.save();

        // Respond with the user's ID
        res.status(200).json(user._id);
    } catch (err) {
        // Handle errors
        res.status(500).json({ error: err.message }); // Use `err` for error handling
    }
});
router.post("/login",async (req,res)=>{
    const user= await User.findOne({username : req.body.username});
    !user && res.status(404).json("wrong user has been requested");
    

    const validpassword = await bcrypt.compare(req.body.password,user.password);
    !validpassword && res.status(404).json("wrong password has been enterd");

    res.status(200).json({_id:user._id , username:user.username});
})

module.exports = router; // Export the router
