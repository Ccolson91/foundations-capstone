const toggle = document.getElementById('toggle')
// Toggle Navigation
toggle.addEventListener('click', () => document.body.classList.toggle('show-nav'))

// const getAllOffers = () => axios.get('http://localhost:4040/existing-offers').then(offersCallback).catch(error => {console.log(error)})