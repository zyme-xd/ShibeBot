const Twit = require('twit')
const dotenv = require('dotenv')

var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  strictSSL:            true,     // i want to do some more verification stuff i guess
})

