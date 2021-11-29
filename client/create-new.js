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
//assigns variable to error callback
// const errCallback = err => console.log(err.response.data)
// create offer - axios POST request
const createOffer = body => axios.post(baseURL, body).then(offersCallback).catch(error => { console.log(error)})
//delete offer - axios DELETE request
const deleteOffer = id => axios.delete(`${baseURL}/${id}`).then(offersCallback).catch( error => { console.log(error)})

//handler function to be passed in to event listener
function submitHandler(e){
  e.preventDefault()
  
  let bus_name = document.querySelector('#business-name')
  let stylist_name = document.querySelector('#stylist-name')
  let offer_choice = document.querySelector('input[name="new-guest-offer"]:checked')
  
  let bodyObj = {
    bus_name: bus_name.value,
    stylist_name: stylist_name.value,
    offer: offer_choice.value
  }
  
  createOffer(bodyObj)

  
  bus_name.value = ''
  stylist_name.value = ''
  offer_choice.checked = false

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
  <p class='offer-selected'>${offer.offer}
  <br>
  <br>
  <button onclick='submit()'>Submit!</button>
  <button id = 'delete-staged-offer' onclick='deleteOffer(${offer.id})'>Delete</button>
  ` 
  const deleteStagedBtn = document.getElementById('delete-staged-offer')
  
  // append offerCard to the offersContainer
  offersContainer.appendChild(offerCard)
}

// function to display offer
function displayOffers(arr){
  offersContainer.innerHTML = ``
  // for(let i = 0; i < arr.length; i++){
  //   createOfferCard(arr[i])
  // }
  createOfferCard(arr[arr.length - 1])
}

// function submit(e){
  
// }


// Submit create new offer button
submitForm.addEventListener('submit', submitHandler)