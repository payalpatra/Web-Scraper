const PORT = 8000;
const express = require('express');
const axios = require('axios')
const cheerio = require('cheerio');


const app = express()
const url = "https://www.flipkart.com/"
const items = []

app.get("/", function (req, res) {
    res.send("Welcome to the Server")
})

axios(url).then(res => {
    const html = res.data

    const $ = cheerio.load(html)

    $("._3LU4EM", html).each(function () {
        const title = $(this).text()
        items.push({
            title, url
        })
    })

}).catch(err => console.log(err))

app.get("/items", function (req, res) {
    res.send(items)
})


app.listen(PORT, () => console.log("Server Runnning "))