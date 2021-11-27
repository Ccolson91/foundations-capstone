const users = []

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