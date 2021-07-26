const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();

dotenv.config({
  path: path.join(__dirname, '.env')
});

const PORT = process.env.PORT || 5000;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

module.exports = { 
  PORT,
  userName: DB_USERNAME,
  password: DB_PASSWORD,
  accessTokenSecret: ACCESS_TOKEN_SECRET,
  router 
}