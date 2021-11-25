const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')

app.use(express.json())

const { createOffer } = require('./controller.js')

app.post(`/existing-offers`, createOffer)





const port = process.env.PORT || 4040
app.listen(port, () => console.log(`Server JAMMIN on port number ${port}!`))