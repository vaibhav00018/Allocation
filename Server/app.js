var express = require('express');
var bodyParser = require('body-parser')
var app = express();
const MongoClient = require('mongodb').MongoClient;


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

var db;
MongoClient.connect('mongodb+srv://vaibhav:Passwordmlabs@cluster0-mq4hx.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.error("Error:" + err)
  console.log('Connected to Database');
  db = client.db('Allocation')

})

// Get API for Profile
app.get('/Profile', function (req, res) {

  db.collection('Profile').find().toArray()
    .then(results => {
      console.log(results);
      res.json(results);

    })
    .catch(error => console.error("Error" + error))
});

// Post api from profile.
app.post('/Profile', function (req, res) {
  console.log(req.body);
  db.collection('Profile').insertOne(req.body)
    .then(result => {
      console.log(result)
    })
    .catch(error => console.error(error))

  res.send("Done");
});

// Update the profile api.
app.put('/profile', (req, res) => {
  db.collection('Profile').findOneAndUpdate(
    { name: 'xyz' },
    {
      $set: {
        name: req.body.name
      }
    },
    {
      upsert: true
    }
  )
    .then(
      res.send("Done")
    )
    .catch(error => console.error(error))
})

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});
