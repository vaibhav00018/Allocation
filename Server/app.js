var express = require('express');
var bodyParser = require('body-parser')
var app = express();


const keys = require("./Validation/key");

const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const MongoClient = require('mongodb').MongoClient;

// Load input validation
const validateRegisterInput = require("./Validation/register");
const validateLoginInput = require("./validation/login");

const passport = require("passport");


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./Validation/Passport")(passport);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

var db;
MongoClient.connect('mongodb+srv://vaibhav:Passwordmlabs@cluster0-mq4hx.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.error("Error:" + err)
  console.log('Connected to Database');
  db = client.db('Allocation')

})

// Get API for Profile
app.get('/Profile', function (req, res) {

  let token = req.headers['x-access-token'] || req.headers['authorization'].split(' ')[1];
  jwt.verify(token, keys.secretOrKey, (err, decoded) => {

    if (err) {
      return res.json({
        success: false,
        message: 'Token is not valid'
      });
    } else {
      db.collection('Profile').find().toArray()
        .then(results => {
          console.log(results);
          res.json(results);
        })
        .catch(error => console.error("Error" + error))
    }
  })


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

app.get('/project', function (req, res) {
  console.log(req.body);
  db.collection('Project').find().toArray()
    .then(results => {
      console.log(results);
      res.json(results);

    })
    .catch(error => console.error("Error" + error))
});

// Post api from profile.
app.post('/project', function (req, res) {
  console.log(req.body);
  db.collection('Project').insertOne(req.body)
    .then(result => {
      console.log(result)
    })
    .catch(error => console.error(error))
  res.send("Done");
});


app.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  db.collection('User').findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      };
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          db.collection('User').insertOne(newUser)
            .then(result => {
              console.log(result);
              res.send("Success")
            })
            .catch(error => console.error(error))
        });
      });
    }
  });
});


app.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  db.collection('User').findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});