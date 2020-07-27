require('dotenv').config();

const {
    SERVICE_URL,
    PORT
} = process.env;

module.exports = {
    PORT,
    SERVICE_URL: SERVICE_URL || 'https://jsonplaceholder.typicode.com',
};
