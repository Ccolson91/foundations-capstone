require('dotenv').config()

const Sequelize = require('sequelize')

const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
})

module.exports = {
  login: (req, res) => {
    console.log('logging in user...')
    console.log(req.body)
  },
  register: (req, res) => {
    console.log('registering user...')
    console.log(req.body)
  }
}