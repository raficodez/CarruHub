const express = require('express')
const app = express()
const ownersRouter = require('./routes/ownersRoute')
const usersRouter = require('./routes/usersRoute')
const productsRouter = require('./routes/productsRoute')

const cookieParser = require('cookie-parser')
const path = require('path')
const db = require('./config/mongodb-connection')

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())

app.use('/owners',ownersRouter)
app.use('/products',productsRouter)
app.use('/users',usersRouter)

app.listen(3000)