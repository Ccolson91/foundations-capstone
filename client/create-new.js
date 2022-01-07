// TOGGLE NAVIGATION
const toggle = document.getElementById('toggle')
toggle.addEventListener('click', () => document.body.classList.toggle('show-nav'))

// VARIABLES FROM HTML
const modalCreateNew = document.getElementById('modal-create-new')
const createNew = document.getElementById('create-new')
const closeCreateNew = document.getElementById('close-create-new')
const submitForm = document.getElementById('create-new-form')
const offersContainer = document.querySelector('#offers-container')
const deleteOfferBtn = document.getElementById('delete-offer-btn')
const approveOfferBtn = document.getElementById('approve-offer-btn')

// CREATE NEW MODAL (DISPLAY, HIDE, OUTSIDE CLICK)
createNew.addEventListener('click', () => {
  modalCreateNew.classList.add('show-modal-create-new')
})

closeCreateNew.addEventListener('click', () => {
  modalCreateNew.classList.remove('show-modal-create-new')
})

window.addEventListener('click', e => e.target == modalCreateNew ? modalCreateNew.classList.remove('show-modal-create-new') : false)

// BASE URL
const baseURL =  `http://localhost:4040/create-new`

// SENDS DATA TO FRONT-END
const offersCallback = ({ data: offers }) => displayOffers(offers)

// REDIRECTS TO EXISTING OFFERS PAGE
const redirect = () => {
    window.location.replace('http://127.0.0.1:5500/client/existing-offers.html')}

// FINALIZE OFFERS USING POST REQUEST
const createOffer = body => axios.post(`http://localhost:4040/existing-offers`, body).then(redirect).catch(error => { console.log(error)})

// DELETE OFFERS PASSING IN ID
const deleteOffer = id => axios.delete(`${baseURL}/${id}`).then(offersCallback).catch( error => { console.log(error)})

// HANDLER FUNCTION TO BE PASSED IN TO SUBMIT HANDLER
let bodyObj = {
  bus_name: 'business',
  stylist_name: 'stylist'
}

// SUBMIT HANDLER FUNCTION
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
  
  // PASS IN BODY OBJECT TO CREATE OFFER BODY
  offersContainer.innerHTML = ``
  createOfferCard(bodyObj)

  // MODAL REMOVAL ON CLICK
  modalCreateNew.classList.remove('show-modal-create-new')
}

// CREATES OFFER CARD FOR OFFERS
function createOfferCard(offer){
  const offerCard = document.createElement('div')
  offerCard.classList.add('offer-card')
  offerCard.innerHTML = `
  <p class='offer-busName'>${offer.bus_name}</p>
  <p class='offer-stylistName'>${offer.stylist_name}</p>
  <p class='offer-selected'>${offer.offer}</p>
  `
  offersContainer.appendChild(offerCard)
}

// DISPLAY OFFERS ON FRONT-END
function displayOffers(arr){
  offersContainer.innerHTML = ``
  createOfferCard(arr[arr.length - 1])
}

// SUBMIT, APPROVE AND DELETE EVENT LISTENERS
submitForm.addEventListener('submit', submitHandler)
approveOfferBtn.addEventListener('click', () => createOffer(bodyObj))
deleteOfferBtn.addEventListener('click', deleteOffer)
