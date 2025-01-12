let newsArray = [];

exports.createNews = (newsItem) => {
    newsArray.push(newsItem);
    return newsItem;
};

exports.getAllNews = () => {
    return newsArray;
};  

exports.updateNews = (id, field, value)  => {
    const news = newsArray.find(item => item.id === id);
    news[field] = value;
    return news;
};