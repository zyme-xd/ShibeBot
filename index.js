const Twit = require('twit')
require('dotenv').config()
const axios = require("axios");
// code above gets modules

var T = new Twit({ // grab api keys from a .env file for security
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  bearer_token: process.env.BEARER_TOKEN
})

// code below just makes a tweet
T.post('statuses/update', {
  status: 'hello world! this is shibe bots first "tweet"'
}, function (err, data, response) {
  console.log(err)
})