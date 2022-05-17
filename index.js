const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const redis = require('redis')
let RedisStore = require('connect-redis')(session)

const { 
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    REDIS_URL,
    MONGO_PORT,
    SESSION_SECRET,
    REDIS_PORT,
} = require('./config/config')

const { createClient } = require("redis")
let redisClient = createClient({
    legacyMode: true,
    socket: {
        port: REDIS_PORT,
        host: REDIS_URL
    }
 })
redisClient.connect().catch(console.error)

// let redisClient = redis.createClient({
//     host: REDIS_URL,
//     port: REDIS_PORT
// })

const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () => {
    mongoose
    .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log("successfully connected to DB"))
    .catch((e) => {
        console.log(e)
        setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry()

app.enable("trust proxy")
app.use(
    session({
        store: new RedisStore({client: redisClient}),
        secret: SESSION_SECRET,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 30000,
            resave: false,
            saveUninitialized: false,
        }
    })
)

app.use(express.json())

app.get('/api/v1', (req, res) => {
    res.send('<h2>Hi there!!!</h1>')
    console.log('yeah it ran!!');
})

// localhost:3000/api/v1/posts/
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/users', userRouter)
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))