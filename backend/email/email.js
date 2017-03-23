var aws = require('aws-sdk')
aws.config.loadFromPath('config.json')
const ses = new aws.SES({apiVersion: '2010-12-01'})
const to = ['projectrivia+appEdit@gmail.com']
const from = 'projectrivia@gmail.com'
const express = require('express')
const bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res){
  res.send('hello world');
})

app.post('/send', function (req, res) {
  console.log(req.body)
  var parsedJson = req.body
  var editId = parsedJson.id
  var editType, editText
  if(parsedJson.question) {
    var editText = parsedJson.question
    editType = "question"
  }
  if(parsedJson.answer) {
    var editText = parsedJson.answer
    editType = "answer"
  }
  ses.sendEmail({ 
    Source: from, 
    Destination: { ToAddresses: to },
    Message: {
      Subject: {
        Data: 'Opentrivia ' + editType + ' edit - ID #' + editId
      },
      Body: {
        Text: {
          Data: 'Suggested edit for ' + editType +' #' + editId + '\n\nSuggested Edit: ' + editText +
                '\n\nOld Question: ' + parsedJson.oldQuestion + '\n\nOld Answer: ' + parsedJson.oldAnswer,
        }
      }
    }
  }, function(err, data) {
    if(err) res.status(400).send('{"message": "Failed to send message."}')
    res.status(200).send('{"message": "Thank you for contributing to the Open Trivia Project."}')
    console.log('Email sent:')
    console.log(data);
  })
})

app.listen(3999)
