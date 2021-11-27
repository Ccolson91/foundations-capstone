const offers = require('./offers.json')
let globalId = 4

module.exports = {
  getAllOffers: (req, res) => {
    res.status(200).send(offers)
  },
  createOffer: (req, res) => {
    let { bus_name, stylist_name, offer } = req.body
    let newOffer = {
      id: globalId,
      bus_name,
      stylist_name,
      offer
    }
    offers.push(newOffer)
    res.status(200).send(offers)
    globalId++
  },
  deleteOffer: (req, res) => {
    const {id} = req.params
    const index = offers.findIndex((offer) => {
      return offer.id === +id
    })
    offers.splice(index, 1)
    res.status(200).send(offers)
  }
}