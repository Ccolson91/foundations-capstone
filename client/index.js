const toggle = document.getElementById('toggle')
// Toggle Navigation
toggle.addEventListener('click', () => document.body.classList.toggle('show-nav'))

const modalSignup = document.getElementById('modal-signup')
const signUp = document.getElementById('open-signup')
const closeSignup = document.getElementById('close-signup')

const modalSignin = document.getElementById('modal-signin')
const signIn = document.getElementById('open-signin')
const closeSignin = document.getElementById('close-signin')


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
