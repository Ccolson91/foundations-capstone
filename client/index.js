// TOGGLE NAVIGATION
const toggle = document.getElementById('toggle')
toggle.addEventListener('click', () => document.body.classList.toggle('show-nav'))

// VARIABLES FROM HTML
const modalSignup = document.getElementById('modal-signup')
const signUp = document.getElementById('open-signup')
const closeSignup = document.getElementById('close-signup')

const modalSignin = document.getElementById('modal-signin')
const signIn = document.getElementById('open-signin')
const closeSignin = document.getElementById('close-signin')

const signUpForm = document.getElementById('modal-form-signup')
const signInForm = document.getElementById('modal-form-signin')


// SIGN UP MODAL (SHOW, HIDE, OUTSIDE CLICK)
signUp.addEventListener('click', () => modalSignup.classList.add('show-modal-signup'))

closeSignup.addEventListener('click', () => modalSignup.classList.remove('show-modal-signup'))

window.addEventListener('click', e => e.target == modalSignup ? modalSignup.classList.remove('show-modal-signup') : false)

// SIGN IN MODAL (SHOW, HIDE, OUTSIDE CLICK)
signIn.addEventListener('click', () => modalSignin.classList.add('show-modal-signin'))

closeSignin.addEventListener('click', () => modalSignin.classList.remove('show-modal-signin'))

window.addEventListener('click', e => e.target == modalSignin ? modalSignin.classList.remove('show-modal-signin') : false)

// LOGIN FUNCTION FOR LOGIN HANDLER - GET REQUEST
const login = () => axios.get('http://localhost:4040/login').then( res => {
  if(res.status === 200){
    window.location.replace('http://127.0.0.1:5500/client/create-new.html')
  }
}).catch(error => {
  console.log(error)
  alert('uh oh. Your request did not work')
})

// REGISTER FUNCTION FOR REGISTRATION HANDLER - POST REQUEST
const register = body => axios.post('http://localhost:4040/register', body).then( res => {
  if(res.status === 200){
    window.location.replace('http://127.0.0.1:5500/client/create-new.html')
  }
}).catch(error => {
  console.log(error)
  alert('uh oh. Your request did not work')
})

// USER LOG-IN HANDLER
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

// REGISTRATION HANDLER
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

  // console.log(bodyObj)

  register(bodyObj)

  newUserName.value = ''
  newUserEmail.value = ''
  newUserPassword.value = ''
  newUserPassword2.value = ''

  modalSignup.classList.remove('show-modal-signup')
}

// FORM EVENT LISTENTERS
signUpForm.addEventListener('submit', registerSubmitHandler)
signInForm.addEventListener('submit', loginSubmitHandler)
