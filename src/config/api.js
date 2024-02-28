const dotenv  = require('dotenv')
dotenv.config()
const axios = require('axios');

const api = axios.create({
  baseURL: process.env.APIbaseURL,
});

module.exports = api;