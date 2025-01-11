const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');
const app = express();

dotenv.config();

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/news', newsRoutes);

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
