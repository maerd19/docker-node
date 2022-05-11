const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose
    .connect('mongodb://ivan:mypassword@mongo:27017/?authSource=admin')
    .then(() => console.log("successfully connected to DB"))
    .catch((e) => console.log(e))

app.get('/', (req, res) => {
    res.send('<h2>Hi there!!!</h1>')
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))