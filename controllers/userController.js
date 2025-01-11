const bcryptHelper = require('../utils/bcryptHelper');
const jwtHelper = require('../utils/jwtHelper');
const { createUser, getUserByEmail } = require('../models/userModel');

exports.signup = async (req, res) => {
    const { name, email, password, preferences } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

    const existingUser = getUserByEmail(email);
    if (existingUser) return res.status(400).json({ error: 'User already exists.' });

    const hashedPassword = await bcryptHelper.hashPassword(password);
    const newUser = { id: Date.now(), name, email, password: hashedPassword, preferences};
    createUser(newUser);

    const token = jwtHelper.generateToken(newUser);
    res.status(200).json({ message: 'User created successfully.', token });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = getUserByEmail(email);
    console.log(user);
    if (!user) return res.status(401).json({ error: 'Invalid email or password.' });

    const isMatch = await bcryptHelper.comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password.' });

    const token = jwtHelper.generateToken(user);
    res.status(200).json({ message: 'Login successful.', token });
};

exports.getPreferences = (req, res) => {
    userEmail = req.user.email;
    userPreferences = getUserByEmail(userEmail).preferences;
    if (!userPreferences) {
        userPreferences = {};
    }
    res.status(200).json({ preferences: userPreferences });
};

exports.updatePreferences = (req, res) => {
    userEmail = req.user.email;
    user = getUserByEmail(userEmail)
    userPreferences = user.preferences;
    if (!userPreferences) {
        userPreferences = {};
    }
    user.preferences = req.body.preferences;
    res.status(200).json({ message: 'Preferences updated successfully.' });
};

