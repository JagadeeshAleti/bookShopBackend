const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bookRoute = require('./routes/book')
const userRoute = require('./routes/user')
const ledgerRoute = require('./routes/ledger')
const logInRoute = require('./routes/auth')
const dotenv = require('dotenv')
const logger = require('./config/logger')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

dotenv.config()

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log("Connected to the Databse"))
 
app.use('/book', bookRoute)
app.use('/user', userRoute)
app.use('/ledger', ledgerRoute)
app.use('/auth', logInRoute)

app.listen(process.env.PORT || 9001)
logger.info("Server running on port 9001")