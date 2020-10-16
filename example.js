// this is example code for interacting with shibe.online's api. i will use this to help me create this bot without it being garbage! thank you :)
const axios = require('axios');
const readline = require('readline-promise').default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require('fs')
ShibeTime()

async function ShibeTime() {
    let amount = await readline.questionAsync('how many dogs do u want? (max is 100)')
    if (amount > 100) {
        console.log("You've requested too many dogs.") // if over 100 doesnt even touch the api
        ShibeTime()
        return
    }
    console.log("ok, getting " + amount, )
    let resp = await axios.get(`http://shibe.online/api/shibes?count=${amount}&urls=true&httpsUrls=true`) // do a request
    let downloads = []
    for (i = 0; i < amount; i++) { // go through every thing in the array and print it til done
        let promise = axios.get(resp.data[i], { responseType: "stream" })
        promise = promise.then(function (resp2){
            resp2.data.pipe(fs.createWriteStream('./folder/' + resp2.config.url.split('/').pop())) 
        })  
        downloads.push(promise)
    }
    await Promise.all(downloads)
    PromptAgain()
}


function PromptAgain() { // basically checks if user wants to get more dogs
    readline.question('do you want to get more dogs? y/n : ', answer => {
        if (answer == "y") { // this may not the best way to do booleans, cuz this is a fake boolean sorta
            ShibeTime()
            return
        }
        if (answer == "n") {
            readline.close()
            return
        }
    })
}