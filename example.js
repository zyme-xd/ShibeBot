// this is example code for interacting with shibe.online's api. i will use this to help me create this bot without it being garbage! thank you :)


const axios = require('axios')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('how many dogs do u want? (max is 100)', amount => {
    console.log("ok, getting " + amount,)
    axios.get(`http://shibe.online/api/shibes?count=${amount}&urls=true&httpsUrls=true`).then(resp => {
        for (i = 0; i < amount; i++) {
            console.log(resp.data[i]);
        }
        readline.close();

    })
})

