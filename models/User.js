const Sequelize = require('sequelize')
const db = require('../database/db.js')
const Country = require('./Country')

const User = db.sequelize.define('user', 
{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    firstName: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    admin: {
        type: Sequelize.TINYINT
    }
},
{
    freezeTableName: true,
    timestamps: false,       
});
User.associate = () => {
    User.belongsToMany(Country, {
        through: 'Country_user',
        as: 'country',
        foreignKey: 'id_user'
    });
};

module.exports = User