require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const app = express()

const { SERVER_PORT } = process.env
const { seed } = require('./seed.js')

app.use(express.json())
app.use(cors())

// DESTRUCTURING FUNCTIONS FROM AUTHCONTROLLER FILE
const { login, register } = require('./authcontroller.js')

// DESTRUCTURING FUNCTIONS FROM CONTROLLER FILE
const { createOffer, deleteOffer, home, getAllOffers, deleteExistingOffer } = require('./controller.js')


app.post('/seed', seed)

app.get('/', home)
app.get('/login', login)
app.post('/register', register)

app.get('/existing-offers', getAllOffers)
app.post('/existing-offers', createOffer)
app.delete('/existing-offers/:id', deleteExistingOffer)
app.delete('/create-new/:id', deleteOffer)


app.listen(SERVER_PORT, () => console.log(`Server JAMMIN on port number ${SERVER_PORT}!`))