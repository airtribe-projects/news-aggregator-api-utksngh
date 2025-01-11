const jwtHelper = require('../utils/jwtHelper'); 

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token); 
    if (!token) return res.status(401).json({ error: 'Token required.' }); 
    try {
        const decoded = jwtHelper.verifyToken(token);
        req.user = decoded;  
        next();  
    } catch (err) {
        console.error('Token verification failed:', err);  
        res.status(401).json({ error: 'Invalid token.' }); 
    }
};
