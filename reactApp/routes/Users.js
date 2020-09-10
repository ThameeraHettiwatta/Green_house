const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const md5 = require('md5')

const User = require('../models/User')
const Greenhouses = require('../models/greenhouses')
const Temperature = require('../models/temperature')
const Soil = require('../models/soil')
const Lux = require('../models/lux')
const Tanklevel = require('../models/tanklevel')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    type: req.body.type,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    location: req.body.location,
    email: req.body.email,
    password: req.body.password,
    created: today
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        userData.password = md5(req.body.password)
        User.create(userData)
          .then(user => {
            res.json({ status: user.email + 'Registered!' })
          })
          .catch(err => {
             res.send('error: ' + err)
          })
        // console.log("tuu")
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        //  if (bcrypt.compareSync(req.body.password, user.password)) {
        if(user.password == md5(req.body.password)){
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        }
      } else {
        res.status(400).json({ error: 'User does not exist' })
      }
    })
    // .catch(err => {
    //   res.status(400).json({ error: err })
    // })
})

users.get('/profile', (req, res) => {
  if(req.query.owner_email){
    Greenhouses.findOne({
      where: {
        owner_email: req.query.owner_email
      }
    })
      .then(user => {
        if (user) {
          res.json(user)
        } else {
          res.send('User does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
  else{
    Greenhouses.findOne({
      where: {
        instructor_email: req.query.instructor_email
      }
    })
      .then(user => {
        if (user) {
          res.json(user)
        } else {
          res.send('User does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }

})

users.get('/join', (req, res)=> {
  User.findAll({
    where: {
      type: req.query.type
    }
  })
  .then(user => {
    if(user) {
      res.json(user)
    } else{
      res.send('user does not exist')
    }
  })
  .catch(err =>{
    res.send('error:' +err)
  })
})

users.post('/addgh', (req, res) => {
  const userData = {
    gh_name: req.body.gh_name,
    owner_email: req.body.owner_email,
    instructor_email: req.body.instructor_email,
  }

  Greenhouses.findOne({
    where: {
      owner_email: req.body.owner_email
    }
  })
    .then(user => {
      if (!user) {
        Greenhouses.create(userData)
          .then(user => {
            res.json('Added!')
          })
          .catch(err => {
             res.send('error: ' + err)
          })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })

})

users.get('/temperature', (req, res)=> {
  Temperature.findAll({
    limit: 10, 
    order: [['id', 'DESC']]
  })
  .then(user => {
    if(user) {
      res.json(user)
    } else{
      res.send('user does not exist')
    }
  })
  .catch(err =>{
    res.send('error123:' +err)
  })
})

users.get('/soil', (req, res)=> {
  Soil.findAll({
    limit: 10, 
    order: [['id', 'DESC']]
  })
  .then(user => {
    if(user) {
      res.json(user)
    } else{
      res.send('user does not exist')
    }
  })
  .catch(err =>{
    res.send('error123:' +err)
  })
})

users.get('/lux', (req, res)=> {
  Lux.findAll({
    limit: 10, 
    order: [['id', 'DESC']]
  })
  .then(user => {
    if(user) {
      res.json(user)
    } else{
      res.send('user does not exist')
    }
  })
  .catch(err =>{
    res.send('error123:' +err)
  })
})

users.get('/tanklevel', (req, res)=> {
  Tanklevel.findAll({
    limit: 10, 
    order: [['id', 'DESC']]
  })
  .then(user => {
    if(user) {
      res.json(user)
    } else{
      res.send('user does not exist')
    }
  })
  .catch(err =>{
    res.send('error123:' +err)
  })
})

users.post('/temperature', (req, res) => {
  const today = new Date()
  const userData = {
    tp_value: req.body.tp_value,
    timestamp: today
  }
  Temperature.create(userData)
          .then(user => {
            res.json('Added!'+user)
          })
          .catch(err => {
             res.send('error: ' + err)
          })
})

users.post('/soil', (req, res) => {
  const today = new Date()
  const userData = {
    soil_value: req.body.soil_value,
    timestamp: today
  }
  Soil.create(userData)
          .then(user => {
            res.json('Added!'+user)
          })
          .catch(err => {
             res.send('error: ' + err)
          })
})

users.post('/lux', (req, res) => {
  const today = new Date()
  const userData = {
    lux_value: req.body.lux_value,
    timestamp: today
  }
  Lux.create(userData)
          .then(user => {
            res.json('Added!'+user)
          })
          .catch(err => {
             res.send('error: ' + err)
          })
})

users.post('/tanklevel', (req, res) => {
  const today = new Date()
  const userData = {
    tank_level: req.body.tank_level,
    timestamp: today
  }
  Tanklevel.create(userData)
          .then(user => {
            res.json('Added!'+user)
          })
          .catch(err => {
             res.send('error: ' + err)
          })
})

module.exports = users
