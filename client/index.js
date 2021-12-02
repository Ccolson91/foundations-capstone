const toggle = document.getElementById('toggle')
// Toggle Navigation
toggle.addEventListener('click', () => document.body.classList.toggle('show-nav'))

const modalSignup = document.getElementById('modal-signup')
const signUp = document.getElementById('open-signup')
const closeSignup = document.getElementById('close-signup')

const modalSignin = document.getElementById('modal-signin')
const signIn = document.getElementById('open-signin')
const closeSignin = document.getElementById('close-signin')

const signUpForm = document.getElementById('modal-form-signup')
const signInForm = document.getElementById('modal-form-signin')


// Show modal sign up
signUp.addEventListener('click', () => modalSignup.classList.add('show-modal-signup'))

// Hide modal sign up
closeSignup.addEventListener('click', () => modalSignup.classList.remove('show-modal-signup'))

// Hide modal sign up on outside click
window.addEventListener('click', e => e.target == modalSignup ? modalSignup.classList.remove('show-modal-signup') : false)

// Show modal sign in
signIn.addEventListener('click', () => modalSignin.classList.add('show-modal-signin'))

// Hide modal sign in
closeSignin.addEventListener('click', () => modalSignin.classList.remove('show-modal-signin'))

// Hide modal sign in on outside click

window.addEventListener('click', e => e.target == modalSignin ? modalSignin.classList.remove('show-modal-signin') : false)

// login function for axios POST request
const login = body => axios.post('http://localhost:4040/login', body).then( res => {
  if(res.data === "Login success"){
    window.location.replace('/')
  }
}).catch(error => {
  console.log(error)
  alert('uh oh. Your request did not work')
})

// registration function for axios POST request
const register = body => axios.post('http://localhost:4040/register', body).then( res => {
  if(res.status === 200){
    window.location.replace('http://127.0.0.1:5500/client/create-new.html')
  }
}).catch(error => {
  console.log(error)
  alert('uh oh. Your request did not work')
})

// Logout function with axios GET request
const logout = () => {
  axios.get('http://localhost:4040/logout', { withCredentials: true })
    .then(res => window.location.replace('/'))
}

// login handler function

function loginSubmitHandler(e){
  e.preventDefault()

  let userEmail = document.querySelector('#user-email')
  let userPassword = document.querySelector('#user-password')

  let bodyObj = {
    user_email: userEmail.value,
    user_password: userPassword.value
  }
  login(bodyObj)

  userEmail.value = ''
  userPassword.value = ''
}

// register handler function

function registerSubmitHandler(e){
  e.preventDefault()

  let newUserName = document.querySelector('#name')
  let newUserEmail = document.querySelector('#email')
  let newUserPassword = document.querySelector('#password')
  let newUserPassword2 = document.querySelector('#password2')

  if(newUserPassword.value !== newUserPassword2.value){
    alert('Your passwords need to match.')
    return
  }

  let bodyObj = {
    newUserName: newUserName.value,
    newUserEmail: newUserEmail.value,
    newUserPassword: newUserPassword.value
  }
  console.log(bodyObj)
  register(bodyObj)

  newUserName.value = ''
  newUserEmail.value = ''
  newUserPassword.value = ''
  newUserPassword2.value = ''

  modalSignup.classList.remove('show-modal-signup')
}

//Form authentication
// checkSession = async () => {
//   const response = await axios.get('http://localhost:4040/authenticate', { withCredentials: true })
//   const data = response.data
//   if(data.username){
//     window.location.replace('/')
//   }
// }



// document.addEventListener('DOMContentLoaded', checkSession)
signUpForm.addEventListener('submit', registerSubmitHandler)
signInForm.addEventListener('submit', loginSubmitHandler)
