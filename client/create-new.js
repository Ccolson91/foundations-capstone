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
const baseURL =  `http://localhost:4040/create-new`
// assigns a variable to function that runs displayOffers function on offers
const offersCallback = ({ data: offers }) => displayOffers(offers)
const redirect = () => {
    window.location.replace('http://127.0.0.1:5500/client/existing-offers.html')}
//assigns variable to error callback
// const errCallback = err => console.log(err.response.data)
// create offer - axios POST request
const createOffer = body => axios.post(`http://localhost:4040/existing-offers`, body).then(redirect).catch(error => { console.log(error)})
//delete offer - axios DELETE request
const deleteOffer = id => axios.delete(`${baseURL}/${id}`).then(offersCallback).catch( error => { console.log(error)})
//submit offer - axios PUT request
// const submitOffer = body => axios.post(`http://localhost:4040/existing-offers/`, body).then( res => {
//   if(res.status === 200){
//     window.location.replace('http://127.0.0.1:5500/client/existing-offers.html')
//   }
// }).catch(error => {
//   console.log(error)
//   alert('uh oh. Your request did not work')
// })

//handler function to be passed in to event listener
let bodyObj = {
  bus_name: 'business',
  stylist_name: 'stylist'
}

function submitHandler(e){
  e.preventDefault()
  
  let bus_name = document.querySelector('#business-name')
  let stylist_name = document.querySelector('#stylist-name')
  let offer_choice = document.querySelector('input[name="new-guest-offer"]:checked')
  
  bodyObj.bus_name = bus_name.value
  bodyObj.stylist_name = stylist_name.value
  bodyObj.offer = offer_choice.value
  bodyObj.offer_choice = offer_choice['id']

  bus_name.value = ''
  stylist_name.value = ''
  offer_choice.value  = ''
  offer_choice.checked = false
  
  // createOffer(bodyObj)
  offersContainer.innerHTML = ``
  createOfferCard(bodyObj)

  // Remove modal after button click
  modalCreateNew.classList.remove('show-modal-create-new')
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
  offerCard.innerHTML = `
  <p class='offer-busName'>${offer.bus_name}</p>
  <p class='offer-stylistName'>${offer.stylist_name}</p>
  <p class='offer-selected'>${offer.offer}</p>
  `
  // <button onclick='createOffer(offer)'>Approve</button>
  // append offerCard to the offersContainer
  offersContainer.appendChild(offerCard)
}

// function to display offer
function displayOffers(arr){
  offersContainer.innerHTML = ``
  createOfferCard(arr[arr.length - 1])
}


const deleteOfferBtn = document.getElementById('delete-offer-btn')
const approveOfferBtn = document.getElementById('approve-offer-btn')

deleteOfferBtn.addEventListener('click', deleteOffer)

approveOfferBtn.addEventListener('click', () => createOffer(bodyObj))



// Submit create new offer button
submitForm.addEventListener('submit', submitHandler)