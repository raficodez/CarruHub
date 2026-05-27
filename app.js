const express = require('express')
const app = express()
const ownersRouter = require('./routes/ownersRoute')
const usersRouter = require('./routes/usersRoute')
const productsRouter = require('./routes/productsRoute')
const expressSession = require('express-session')
const flash = require('connect-flash')
const indexRouter = require('./routes/index')

require("dotenv").config();

const cookieParser = require('cookie-parser')
const path = require('path')
const db = require('./config/mongodb-connection')

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())

app.use(expressSession({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))
app.use(flash());

app.use('/',indexRouter)
app.use('/owners', ownersRouter)
app.use('/products', productsRouter)
app.use('/users', usersRouter)

app.listen(3000)