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
  // sendEmail: (req, res) => {
  //   let to
  //   let subject
  //   let body
  //   upload(req, res, function(err){
  //     if(err){
  //       console.log(err)
  //       return res.end('Something went wrong')
  //     } else {
  //       to = req.body.to
  //       subject = req.body.subject
  //       body = req.body.body

  //       console.log(to)
  //       console.log(subject)
  //       console.log(body)
  //     }
  //   })
  // },
  getAllOffers: (req, res) => {
    sequelize.query(`
    select bus_name, stylist_name,offer_name, current_offers.offer_id
    from current_offers
    join offers
    on  current_offers.offer_id = offers.offer_id;
    `)
    .then((dbRes) => res.status(200).send(dbRes[0]))
    .catch((err) => console.log(err))
    // res.status(200).send(offers)
  },
  createOffer: (req, res) => {
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
  },
  deleteExistingOffer: (req, res) => {
    const {id} = req.params
    // const index = offers.findIndex((offer) => {
    //   return offer.id === +id
    // })
    // offers.splice(index, 1)
    sequelize.query(`
    delete
    from current_offers
    where offer_id = ${id};
    `)
    res.status(200).send(offers)
  }
}