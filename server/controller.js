const offers = require('./offers.json')
let globalId = 4

module.exports = {
  // getOffers: (req, res) => {
  //   res.status(200).send(offers)
  // },
  createOffer: (req, res) => {
    let { bus_name, stylist_name, offer } = req.body
    // console.log(req.body)
    // console.log(bus_name, stylist_name, offer)
    let newOffer = {
      id: globalId,
      bus_name,
      stylist_name,
      offer
    }
    console.log(newOffer)
    offers.push(newOffer)
    res.status(200).send(offers)
    globalId++
  }
  // deleteOffer: (req, res) => {
  //   const {id} = req.params
  // }
}