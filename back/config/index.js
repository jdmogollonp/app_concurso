require('dotenv').config();

const config = {
    allowedOrigin: process.env.ALLOWED_ORIGIN || 'http://localhost:8080',
    port: process.env.PORT || 8080,
    host: process.env.HOST || '0.0.0.0',
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    originalVideosPath: process.env.ORIGINAL_VIDEOS_PATH || 'uploads/videos/original',
    processedVideosPath: process.env.PROCESSED_VIDEOS_PATH || 'uploads/videos/processed',
};

module.exports = config;
