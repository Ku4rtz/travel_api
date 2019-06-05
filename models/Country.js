const Sequelize = require('sequelize')
const db = require('../database/db.js')
const User = require('./User')

const Country = db.sequelize.define('country', 
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: Sequelize.INTEGER        
        },
        alpha2: {
            type: Sequelize.STRING
        },
        alpha3: {
            type: Sequelize.STRING
        },
        name_en: {
            type: Sequelize.STRING
        },
        name_fr: {
            type: Sequelize.STRING
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });
    Country.associate = () => {
      Country.belongsToMany(User, {
        through: 'Country_user',
        as: 'user',
        foreignKey: 'id_country'
      });
    };

module.exports = Country;