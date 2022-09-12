module.exports = {
    port: 3000,
    db: 'mongodb://localhost:27017/blogDB',
    //JWT_CODE should be hidden in .env file
    JWT_CODE: 'geheim',
    COOKIE_LIFETIME: 3600 * 1000 * 24 * 7,
    TOKEN_LIFETIME: '7d'
}