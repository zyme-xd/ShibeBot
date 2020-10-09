const Twit = require('twit')
const dotenv = require('dotenv')

var T = new Twit({
  consumer_key:         ,
  consumer_secret:      ,
  access_token:         ,
  access_token_secret:  ,
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})