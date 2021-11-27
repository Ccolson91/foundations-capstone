const express = require('express')
const cors = require('cors')
const app = express()
// const path = require('path')

app.use(express.json())
app.use(cors())

const { createOffer, deleteOffer } = require('./controller.js')


app.post('/create-new', createOffer)
app.delete('/create-new/:id', deleteOffer)






const port = process.env.PORT || 4040
app.listen(port, () => console.log(`Server JAMMIN on port number ${port}!`))