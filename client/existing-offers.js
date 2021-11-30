// const { default: axios } = require("axios")
const existingOffersContainer = document.getElementById('existing-offers-container')
const toggle = document.getElementById('toggle')
// Toggle Navigation
toggle.addEventListener('click', () => document.body.classList.toggle('show-nav'))

const offersButton = document.getElementById('see-offers-btn')

const showAllOffers = ({ data: offers }) => 
displayAllOffers(offers)

const getAllOffers = () => axios.get(`http://localhost:4040/existing-offers`).then(showAllOffers).catch(err => console.log(err))

function createExistingOfferCard(offer){
  const existingOfferCard = document.createElement('div')
  existingOfferCard.classList.add('existing-offer-card')

  existingOfferCard.innerHTML = `
  <p class='offer-busName'>${offer.bus_name}</p>
  <p class='offer-stylistName'>${offer.stylist_name}</p>
  <p class='offer-selected'>${offer.offer}</p>
  `
  existingOffersContainer.appendChild(existingOfferCard)
}


function displayAllOffers(arr){
  existingOffersContainer.innerHTML = ``
  for(let i = 0; i < arr.length; i++){
    createExistingOfferCard(arr[i])
  }
}

offersButton.addEventListener('click', getAllOffers)