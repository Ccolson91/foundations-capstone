// TOGGLE NAVIGATION
const toggle = document.getElementById('toggle')
toggle.addEventListener('click', () => document.body.classList.toggle('show-nav'))

const existingOffersContainer = document.getElementById('existing-offers-container')
const offersButton = document.getElementById('see-offers-btn')

// SENDS DATA TO THE FRONT-END
const showAllOffers = ({ data: offers }) => displayAllOffers(offers)

// GETS ALL CURRENT OFFERS 
const getAllOffers = () => axios.get(`http://localhost:4040/existing-offers`).then(showAllOffers).catch(err => console.log(err))

// DELETES EXISTING OFFERS
const deleteExistingOffer = id => axios.delete(`http://localhost:4040/existing-offers/${id}`).then(showAllOffers).catch(error => { console.log(error)})

// CREATES OFFER CARD FOR APPROVED OFFERS
function createExistingOfferCard(offer){
  const existingOfferCard = document.createElement('div')
  existingOfferCard.classList.add('existing-offer-card')

  existingOfferCard.innerHTML = `
  <p class='offer-busName'>${offer.bus_name}</p>
  <p class='offer-stylistName'>${offer.stylist_name}</p>
  <p class='offer-selected'>${offer.offer_name}</p>
  <button id='permanent-delete' onclick='deleteExistingOffer(${offer.offer_id})'>Delete</button>
  `
  existingOffersContainer.appendChild(existingOfferCard)
}

// DISPLAYS ALL CURRENT OFFERS
function displayAllOffers(arr){
  existingOffersContainer.innerHTML = ``
  for(let i = 0; i < arr.length; i++){
    createExistingOfferCard(arr[i])
  }
}

// SHOW OFFERS BUTTON EVENT LISTENER
offersButton.addEventListener('click', getAllOffers)