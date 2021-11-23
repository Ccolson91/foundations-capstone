const express = require('express')
const app = express()
const path = require('path')

app.use(express.json())





const port = process.env.PORT || 4040
app.listen(port, () => console.log(`Server JAMMIN on port number ${port}!`))