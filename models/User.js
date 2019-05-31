const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'user',
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
    },
    {
        freezeTableName: true,
        timestamps: false
    },
)