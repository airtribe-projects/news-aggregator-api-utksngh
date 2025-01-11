const bcrypt = require('bcryptjs');

// Hash password
exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Compare password
exports.comparePassword = async (inputPassword, hashedPassword) => {
    return bcrypt.compare(inputPassword, hashedPassword);
};
