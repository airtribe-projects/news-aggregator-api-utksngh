const axios = require('axios');  
const { getUserByEmail } = require('../models/userModel'); 
const { createNews, getAllNews, updateNews } = require('../models/newsModel');

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

        const alreadyFetchedNews = getAllNews();
        updatedPreferences = userPreferences.filter(preference => !alreadyFetchedNews.some(item => item.keyword === preference));

        if (updatedPreferences.length === 0) {
            return res.status(200).json({ news: alreadyFetchedNews });
        }


        const newsPromises = updatedPreferences.map(async (preference, index) => {
            const response = await axios.get('https://newsapi.org/v2/top-headlines', {
                params: {
                    q: preference,   
                    apiKey: process.env.NEWS_API_KEY, 
                    language: 'en',             
                    country: 'us',             
                },
            });

        
            console.log(`Fetched news for: ${preference}`, response.data);
            const newNews = { id: index+1,articles: response.data.articles, favorite: false, read: false, keyword: preference};
            createNews(newNews);
            console.log(getAllNews());

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

exports.MarkAsRead = async (req, res) => {
    const newsId = parseInt(req.params.id);
    const news = getAllNews();
    const newsItem = news.find(item => item.id === newsId);
    
    if (newsItem) {
        updateNews(newsId, 'read', true);
        res.status(200).json({ message: 'News marked as read.' });
    } else {
        res.status(404).json({ message: 'News with given id not found.' });
    }
};

exports.MarkAsFavorite = async (req, res) => {
    const newsId = parseInt(req.params.id);
    const news = getAllNews();
    const newsItem = news.find(item => item.id === newsId);
    
    if (newsItem) {
        updateNews(newsId, 'favorite', true);
        res.status(200).json({ message: 'News marked as favorite.' });
    } else {
        res.status(404).json({ message: 'News with given id not found.' });
    }
};  

exports.getAllReadNews = async (req, res) => {
    const news = getAllNews();
    const readNews = news.filter(item => item.read);
    const newsArticles = readNews.flatMap(item => item.articles);
    res.status(200).json({ articles: newsArticles });
};

exports.getAllFavoriteNews = async (req, res) => {
    const news = getAllNews();
    const favoriteNews = news.filter(item => item.favorite);
    const newsArticles = favoriteNews.flatMap(item => item.articles);
    res.status(200).json({ articles: newsArticles });
}; 

exports.searchNews = async (req, res) => {
    const keyword = req.params.keyword.toLowerCase();
    const news = getAllNews();
    
    const searchResults = news.filter(item => {
        // Check if item has articles array before searching
        return item && item.articles && Array.isArray(item.articles) && 
            item.articles.some(article => 
                article.title?.toLowerCase().includes(keyword) || 
                article.description?.toLowerCase().includes(keyword)
            );
    });

    const matchingArticles = searchResults.flatMap(item => 
        (item.articles || []).filter(article => 
            article.title?.toLowerCase().includes(keyword) || 
            article.description?.toLowerCase().includes(keyword)
        )
    );

    res.status(200).json({ articles: matchingArticles });
};  

