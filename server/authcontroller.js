require('dotenv').config()
const path = require('path')

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
    const { user_email } = req.body
    sequelize.query(`
    select * from users 
    `)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log('error ===>', err))
  },
  register: (req, res) => {
    let {
      newUserName,
      newUserEmail,
      newUserPassword
    } = req.body
    sequelize.query(`insert into users (user_name, user_email, user_password)
    values('${ newUserName}','${newUserEmail}', '${newUserPassword}');`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log('error:', err))
  }
}