const express = require('express')
const app = express()
const cors = require('cors')
const mongodb = require('mongodb')

require('dotenv').config()

const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

const log = require('./log')
const Log = log.Log
const Exercise = log.Exercise
const User = require('./user')


const uri = 'mongodb://localhost:27017/mydb'
const connect = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })


connect.then((db) => {
  console.log('connectd correctly to server...')
}), (err) => { console.log(err) }
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', (req, res, next) => {
  console.log(req.body)
  User.create({ username: req.body.username })
    .then((user) => {
      Log.create({ id: user._id, username: user.username })
        .then((log) => {
          console.log(log)
        })
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user)
    })

    .catch((err) => next(err))
})
app.get('/api/users/:id', (req, res, next) => {
  console.log(req.body)
  User.findById(req.params.id)
    .then((user) => {
      Log.create({ id: user._id, username: user.username })
        .then((resp) => {
          resp.save()

        })
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user)
    })
    .catch((err) => next(err))
})


app.post('/api/users/:id/exercises', (req, res, next) => {
  console.log(req.body)
  User.findById(req.params.id)
    .then((user) => {
      Exercise.create({ description: req.body.description, duration: req.body.duration, date: req.body.date })
        .then((resp) => {
          console.log(resp)
          

          Log.findOne({ id: req.params.id  })


            .then((log) => {
              log.log.push(resp)
              log.save()
              console.log(log,"while finding log");
              res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(log)
          console.log(resp)

            })


        })

    })

















  .catch((err) => next(err))
})


app.get('/api/users/:id/logs', (req, res, next) => {
  console.log(req.params.id)
  Log.find({ id: req.params.id })
    .then((log) => {

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(log)
    })











})




app.get('/api/users', (req, res, next) => {
  console.log(req.body)
  User.find({})
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user)
    })
    .catch((err) => next(err))
})






const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on  ' + listener.address().port)
})
