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
  seed: (req, res) => {
    sequelize
      .query(
        `
    drop table if exists offers;
    drop table if exists users;
    drop table if exists current_offers;
    drop table if exists past_offers;

    create table offers (
      offer_id serial primary key,
      offer_name varchar(150)
    );

    create table users (
      user_id serial primary key,
      user_name varchar(100),
      user_email varchar(50),
      user_password varchar(50)
    );

    create table current_offers (
      active_offer_id serial primary key,
      bus_name varchar(100),
      stylist_name varchar(100),
      user_id integer references users(user_id),
      offer_id integer references offers(offer_id)
    );

    create table past_offers (
      past_offer_id serial primary key,
      user_id integer references users(user_id),
      offer_id integer references offers(offer_id),
      active_offer_id integer references current_offers(active_offer_id)
    );

    insert into offers (offer_name)
    values('$25 off your first visit of $50 or more!'),
      ('$50 off your first visit of $100 or more!'),
      ('Buy 1 get 1 free on any product in store!');

    insert into users (user_name, user_email, user_password)
    values('Janet Jones', 'j_jones@gmail.com', 'jonespassword'),
      ('Sally Turner', 's_turner@gmail.com', 'turnerpassword'),
      ('Sue Johnson', 's_johnson@gmail.com', 'johnsonpassword'),
      ('Lee Caro', 'l_caro@gmail.com', 'caropassword'),
      ('Carol White', 'c_white@gmail.com', 'whitepassword');

    insert into current_offers (bus_name, stylist_name, user_id, offer_id)
    values('Jones Hair Salon', 'Sally Mae', 1, 1),
      ('Sally & Friends Salon', 'Jessie Broussard', 2, 2),
      ('Salon Bohemia', 'Alexis Jones', 3, 1),
      ('A Lee Caro Salon', 'Lee Caro', 4, 3),
      ('A Lee Caro Salon', 'Lee Caro', 4, 2),
      ('Dolce Vita Salon', 'Carol White', 5, 1),
      ('Salon Bohemia', 'Jessi Holmes', 3, 2),
      ('Dolce Vita Salon', 'Jessie Broussard', 5, 2),
      ('A Lee Caro Salon', 'Jensen Bueno', 4, 2),
      ('Sally & Friends Salon', 'Jessie Broussard', 2, 3),
      ('Jones Hair Salon', 'Sally Mae', 1, 3);
        `
      ).then(() => {
        console.log('DB seeded!')
        res.sendStatus(200)
      }).catch(error => console.log('guess what? error seeding DB', error))
  }
}