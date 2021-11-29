require('dotenv').config()
const path = require('path')
const bcrypt = require('bcryptjs')

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
    const { user_email, user_password } = req.body
    sequelize.query(`
      select * from users where user_email = ${user_email}
    `).then(dbRes => {
      const existingUser = dbRes[0].pop()
      const authenticated = bcrypt.compareSync(user_password, existingUser.user_password)
      if(authenticated){
        req.session.user = existingUser
        delete req.session.user.password
        res.status(200).send('Login success!')
      }
    })
  },
  register: (req, res) => {
    let {
      newUserName,
      newUserEmail,
      newUserPassword
    } = req.body
    // console.log(req.body)
    sequelize.query(`insert into users (user_name, user_email, user_password)
    values('${ newUserName}','${newUserEmail}', '${newUserPassword}');`)
      .then(dbRes => {
        req.session.user = {user_name: newUserName}
        res.status(200).send(req.session)
      })
        .catch((err) => console.log(err))
  },
  authenticate: (req, res) => {
    if(req.session.user){
      res.status(200).send(req.session.user)
    } else {
      res.status(200).send('Whoops! Please try again!')
    }
  },
  logout: (req, res) => {
    req.session.destroy()
    res.status(200).send('Logged out!')
  }
}