const Twit = require('twit')
require('dotenv').config()

var T = new Twit({ // grab api keys from a .env 
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  bearer_token: process.env.BEARER_TOKEN
})


T.post('statuses/update', { status: 'hello world! this is shibe bots first "tweet"' }, function(err, data, response) {
  console.log(err)
})