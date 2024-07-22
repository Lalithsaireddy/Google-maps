const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');


passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


router.get('/passport', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).send("You are already logged in.");
    } else {
        res.status(401).json("You need to log in.");
    }
});


router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        await User.register(user, password); 

        res.status(201).json({ userId: user._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).json({ userId: req.user._id, username: req.user.username });
});

module.exports = router;
