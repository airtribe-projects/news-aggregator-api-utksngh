const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
