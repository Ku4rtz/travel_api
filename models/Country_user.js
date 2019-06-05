const Sequelize = require('sequelize')
const db = require('../database/db.js')

const Country_user = db.sequelize.define('country_user', {
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    id_country: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Country',
            key: 'id'
        }
      }
    });

module.exports = Country_user