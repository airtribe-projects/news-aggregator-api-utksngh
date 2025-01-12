# News Aggregation API

A RESTful API service that fetches and manages personalized news content based on user preferences. The service integrates with NewsAPI to provide current news articles and offers features like favoriting, read tracking, and keyword-based searching.

## Features

- **Personalized News Feed**: Fetches news based on user preferences
- **Article Management**:
  - Mark articles as read
  - Save articles as favorites
  - Search articles by keywords
- **Content Filtering**:
  - View all read articles
  - View all favorite articles
- **User Preference Based**: News content tailored to individual user preferences

## Prerequisites

- Node.js
- npm or yarn
- NewsAPI API key

## Environment Variables

Create a `.env` file in the root directory with the following:
## API Endpoints

### News Operations

- `GET /news`
  - Fetches news articles based on user preferences
  - Requires authenticated user

- `PATCH /news/:id/read`
  - Marks a news article as read
  - Requires article ID

- `PATCH /news/:id/favorite`
  - Marks a news article as favorite
  - Requires article ID

- `GET /news/read`
  - Retrieves all read articles

- `GET /news/favorites`
  - Retrieves all favorited articles

- `GET /news/search/:keyword`
  - Searches articles by keyword in title or description
