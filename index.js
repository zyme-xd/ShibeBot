const Twit = require('twit')
require('dotenv').config()
const axios = require("axios");
const {
  DownloaderHelper
} = require('node-downloader-helper');
const fs = require("fs")
// code above gets modules
const folder = "./folder"
const path = require("path")

var T = new Twit({ // grab api keys from a .env file for security
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  bearer_token: process.env.BEARER_TOKEN
})

function getNewDog() {
  axios.get("https://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true").then(resp => {
    let imageHourly = resp.data[0]
    console.log(imageHourly + " Is the image of the hour. Beginning tweet process.")
    var dl = new DownloaderHelper(imageHourly, './folder', );
    dl.on('end', () => console.log('Download Completed'))
    dl.start();
  })
}


function SeeContents() {
  getNewDog()
  fs.readdirSync(folder).forEach(file => {
    console.log(file);
    var filepath = "./folder/" + file
    dogpost()

    function dogpost() {
      global.b64content = fs.readFileSync(filepath, {
        encoding: 'base64'
      })
      T.post('media/upload', {
        media_data: b64content
      }, function (err, data, response) {

        var mediaIdStr = data.media_id_string
        var altText = "bark."
        var meta_params = {
          media_id: mediaIdStr,
          alt_text: {
            text: altText
          }
        }

        T.post('media/metadata/create', meta_params, function (err, data, response) {
          if (!err) {
            var params = {
              status: 'here is a cute dog!',
              media_ids: [mediaIdStr]
            }

            T.post('statuses/update', params, function (err, data, response) {
              console.log(data)
            })
          }
        });
      })
    }

    fs.readdir(folder, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(folder, file), err => {
          if (err) throw err;
        });
      }
    });
  })
}

SeeContents()

setInterval(SeeContents, 1500000)
