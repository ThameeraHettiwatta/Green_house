const Sequelize = require('sequelize')
const db = require('../database/db.js')
module.exports = db.sequelize.define(
    'greenhouses',
    {
        id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      gh_name: {
        type: Sequelize.STRING
      },
      owner_email: {
        type: Sequelize.STRING,
      },
      instructor_email: {
        type: Sequelize.STRING
      },

    },
    {
        timestamps: false
    }
    )