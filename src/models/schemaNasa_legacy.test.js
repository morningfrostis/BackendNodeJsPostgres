const Sequelize = require('sequelize')
const db = require('../services/db')

const Data = db.define('data', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    idNasa: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    camera: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {},
        get() {
            return JSON.parse(this.getDataValue('camera'))
        },
        set(value) {
            this.setDataValue('camera', JSON.stringify(value))
        }
    },
    img_src: {
        type: Sequelize.STRING,
    },
    earth_date: {
        type: Sequelize.STRING,
    }
})

module.exports = Data