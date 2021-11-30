const offers = require('./offers.json')
let globalId = 6
require('dotenv').config()

const Sequelize = require('sequelize')

const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
})

module.exports = {
  home: (req, res) => res.status(200).sendFile(path.join(__dirname, '../client/index.html')),
  getAllOffers: (req, res) => {
    sequelize.query(`
      select * from current_offers;
    `)
    .then((dbRes) => res.status(200).send(dbRes[0]))
    .catch((err) => console.log(err))
    // res.status(200).send(offers)
  },
  createOffer: (req, res) => {
    console.log(req.body)
    let { bus_name, stylist_name, offer, offer_choice } = req.body
    sequelize.query(` 
    insert into offers (offer_name)
    values('${offer}');
    insert into current_offers (bus_name, stylist_name, offer_id)
    values('${bus_name}', '${stylist_name}', '${offer_choice}');
    select bus_name, stylist_name, offer_name, current_offers.offer_id
    from offers
    join current_offers
    on current_offers.offer_id = offers.offer_id;
    `)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log('error ===>', err))
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