const axios = require('axios');  
const { getUserByEmail } = require('../models/userModel'); 

exports.getNews = async (req, res) => {
    const userEmail = req.user.email;
    
    try {
        const user = await getUserByEmail(userEmail);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userPreferences = user.preferences;

        if (!userPreferences || userPreferences.length === 0) {
            return res.status(400).json({ error: 'User preferences are missing.' });
        }

        const newsPromises = userPreferences.map(async (preference) => {
            const response = await axios.get('https://newsapi.org/v2/top-headlines', {
                params: {
                    q: preference,   
                    apiKey: process.env.NEWS_API_KEY, 
                    language: 'en',             
                    country: 'in',             
                },
            });

        
            console.log(`Fetched news for: ${preference}`, response.data);

            return {
                category: preference,        
                articles: response.data.articles, 
            };
        });

        const newsResults = await Promise.all(newsPromises);
        
        res.status(200).json({ news: newsResults });

    } catch (error) {
        // Catch any errors during the process and respond with a 500 error
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Error fetching news.' });
    }
};
