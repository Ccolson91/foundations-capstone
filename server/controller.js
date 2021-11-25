const offers = require('./offers.json')
let globalId = 4

module.exports = {
  createOffer: (req, res) => {
    let { bus_name, stylist_name, social, offerImage, offer } = req.body
    let newOffer = {
      id: globalId,
      bus_name,
      stylist_name,
      social,
      offerImage,
      offer
    }
    offers.push(newOffer)
    res.status(200).send(offers)
    globalId++
  }
}