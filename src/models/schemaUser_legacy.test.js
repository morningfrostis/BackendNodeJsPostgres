const Sequelize = require('sequelize');
const db = require('../services/db')

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nasaFavs:  {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: []
    },
    salt: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = User;