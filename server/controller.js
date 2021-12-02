require('dotenv').config()
const offers = require('./offers.json')
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
    select bus_name, stylist_name,offer_name, current_offers.offer_id
    from current_offers
    join offers
    on  current_offers.offer_id = offers.offer_id;
    `)
    .then((dbRes) => res.status(200).send(dbRes[0]))
    .catch((err) => console.log(err))
  },
  createOffer: (req, res) => {
    let { bus_name, stylist_name, offer_name, offer_choice } = req.body
    sequelize.query(` 
    insert into offers (offer_name)
    values('${offer_name}');

    insert into current_offers (bus_name, stylist_name, offer_id)
    values('${bus_name}', '${stylist_name}', '${offer_choice}');

    select bus_name, stylist_name, offer_name, current_offers.offer_id
    from offers
    join current_offers
    on current_offers.offer_id = offers.offer_id;
    `)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log('error:', err))
  },
  deleteOffer: (req, res) => {
    const {id} = req.params
    const index = offers.findIndex((offer) => {
      return offer.id === +id
    })
    offers.splice(index, 1)
    res.status(200).send(offers)
  },
  deleteExistingOffer: (req, res) => {
    const {id} = req.params
    sequelize.query(`
    delete
    from current_offers
    where offer_id = ${id};
    `)
    res.status(200).send(offers)
  }
}