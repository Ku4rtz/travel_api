const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize('travel_memories', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    port: 3306
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db