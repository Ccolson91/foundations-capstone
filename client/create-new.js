// const { title } = require("process")

// const { default: axios } = require("axios")

// Toggle Navigation
const toggle = document.getElementById('toggle')
toggle.addEventListener('click', () => document.body.classList.toggle('show-nav'))

const modalCreateNew = document.getElementById('modal-create-new')
const createNew = document.getElementById('create-new')
const closeCreateNew = document.getElementById('close-create-new')
const submitForm = document.getElementById('create-new-form')

// Show modal create new
createNew.addEventListener('click', () => {
  modalCreateNew.classList.add('show-modal-create-new')
})
// Hide modal create new
closeCreateNew.addEventListener('click', () => {
  modalCreateNew.classList.remove('show-modal-create-new')
})
//Hide modal create new on outside click
window.addEventListener('click', e => e.target == modalCreateNew ? modalCreateNew.classList.remove('show-modal-create-new') : false)
// assign a variable to the base url
const baseURL =  `http://localhost:4040/`
// assigns a variable to function that runs displayOffers function on offers
const offersCallback = ({ data: offers }) => displayOffers(offers)
//assigns variable to error callback
// const errCallback = err => console.log(err.response.data)
//create offer - axios POST request
const createOffer = body => axios.post(`${baseURL}/existing-offers`, body).then(offersCallback).catch(error => { console.log(error)})

//handler function to be passed in to event listener
function submitHandler(e){
  e.preventDefault()
  
  let busName = document.querySelector('#business-name')
  let stylistName = document.querySelector('#stylist-name')
  let social = document.querySelector('#social-link')
  let offerChoice = document.querySelector('input[name="new-guest-offer"]:checked')
  let offerImage = document.querySelector('upload-image')
  
  let bodyObj = {
    busName: busName.value,
    stylistName: stylistName.value,
    social: social.value,
    // offerImage: offerImage.value,
    // offerChoice: offerChoice.value
  }
  
  createOffer(bodyObj)
  
  busName.value = ''
  stylistName.value = ''
  social.value = ''
  // offerImage.value = ''
  // offerChoice.value = false
}

// assign variable for container where offers will go
const offersContainer = document.querySelector('#offers-container')
// function to create card for offer to go
function createOfferCard(offer){
  // creates new div and assigns to a variable
  const offerCard = document.createElement('div')
  // add classlist to the variable created
  offerCard.classList.add('offer-card')
  // add html to the variable offerCard
  offerCard.innerHTML = `<img alt='new guest offer' src=${offer.offerImage} class='offer-image'/>
  <p class='offer-busName'>${offer.busName}</p>
  <p class='offer-stylistName'>${offer.stylistName}</p>
  <p class='offer-social'>${offer.social}</p>
  <p class='offer-selected'>${offer.offerChoice}` 
  
  // append offerCard to the offersContainer
  offersContainer.appendChild(offerCard)
}

// function to display offer
function displayOffer(arr){
  offersContainer.innerHTML = ``
  for(let i = 0; i < arr.length; i++){
    createOfferCard(arr[i])
  }
}


// Submit create new offer button
submitForm.addEventListener('submit', submitHandler)