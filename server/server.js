require('dotenv').config()
const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const cors = require('cors')
const app = express()
const { SERVER_PORT } = process.env
const { seed } = require('./seed.js')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

let session = {
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 1000 * 60 * 60 },
  saveUninitialized: false,
  resave: false
}

app.use(sessions(session))


//Seed Database
app.post('/seed', seed)

// homepage login and registration
const { login, register, logout } = require('./authcontroller.js')
// create and delete new offer
const { createOffer, deleteOffer, home, getAllOffers, deleteExistingOffer } = require('./controller.js')

app.get('/', home)
// app.get('/authenticate', authenticate)

app.post('/register', register)

app.post('login', login)

// app.get('/logout', logout)

// app.post('/login', login)


app.get('/existing-offers', getAllOffers)
app.post('/existing-offers', createOffer)
app.delete('/create-new/:id', deleteOffer)
app.delete('/existing-offers/:id', deleteExistingOffer)
// app.post('/existing-offers', submitOffer)







app.listen(SERVER_PORT, () => console.log(`Server JAMMIN on port number ${SERVER_PORT}!`))