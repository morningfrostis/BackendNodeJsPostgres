const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'backend',
    'backend',
    'backend',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
)

module.exports = sequelize;