// Sign up form validation - client
const signupForm = document.getElementById('modal-form-signup')
const name = document.getElementById('name')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

signupForm.addEventListener('submit', (e) => {
  e.preventDefault()
  checkInputs()
})

function checkInputs() {
  //get the values from the inputs
  const name = name.value.trim()
  const email = email.value.trim()
  const password = password.value.trim()
  const password2 = password2.value.trim()

  if(name === '') {
    setErrorFor(name, 'Username cannot be blank')
  } else {
    setSuccessFor(name)
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement //.form-control
  const small = formControl.querySelector('small')

  // add error message inside small 
  small.innerText = message
  // add error class
  formControl.className = 'form-control error'
}