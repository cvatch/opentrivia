var aws = require('aws-sdk')
aws.config.loadFromPath('config.json')
const cors = require('cors')
const ses = new aws.SES({apiVersion: '2010-12-01'})
const to = ['kirkins@gmail.com']
const from = 'kirkins@gmail.com'
const express = require('express')
const bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

var corsOptions = {
  origin: 'https://cvatch.github.io/opentrivia/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};

app.post('/email', cors(corsOptions), function (req, res) {
  var parsedJson = req.body
  console.log(parsedJson);
  ses.sendEmail({ 
    Source: from, 
    Destination: { ToAddresses: to },
    Message: {
      Subject: {
        Data: 'Opentrivia Suggested Edit'
      },
      Body: {
        Text: {
          Data: 'Stop your messing around',
        }
      }
    }
  }, function(err, data) {
    if(err) throw err
    res.status(200).send('{"message": "worked"}')
    console.log('Email sent:')
    console.log(data);
  })
})

app.listen(3999)
