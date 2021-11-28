require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const { SERVER_PORT } = process.env
const { seed } = require('./seed.js')


app.use(express.json())
app.use(cors())

//Seed Database
app.post('/seed', seed)

// homepage login and registration
const { login, register } = require('./authcontroller.js')

app.post('/newuser', register)

app.post('/login', login)
// app.post('/register', register)

// create and delete new offer
const { createOffer, deleteOffer } = require('./controller.js')

app.post('/create-new', createOffer)
app.delete('/create-new/:id', deleteOffer)







app.listen(SERVER_PORT, () => console.log(`Server JAMMIN on port number ${SERVER_PORT}!`))