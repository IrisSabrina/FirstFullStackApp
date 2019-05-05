//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/'+ `stitchy`;

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000
// app.get('/' , (req, res) => {
//   res.send('Hello World!');
// });

// New Route
app.get('/welcomepage/new', (req, res) => { 
  res.render('new.ejs');
});

// Seed Route
const Stitches = require('./models/stitches.js')
app.get('/seed', async (req, res) => {
  const newStitches =
  [
    {
      img: "https://i.imgur.com/psb41Th.jpg",
      name: 'woven wheel & satin stitch combo',
      level: 'Intermediate',
      type: 'Filling',
      notes: 'Used for filling large areas and creating depth. Satin stitch is especially useful for creating color gradients.'
    },
    {
      img: "https://i.imgur.com/M34i15X.png",
      name: 'bullion knot stitch',
      level: 'Intermediate',
      type: 'Filling',
      notes: 'Used for filling small to medium areas and creating depth.'
    },
    {
      img: "https://i.imgur.com/KnVWjuK.jpg",
      name: 'isolated chain stitch, stem stitch, & wheel stitch combo',
      level: 'Beginner to Intermediate',
      type: 'Filling or Line',
      notes: 'Used for filling small to medium areas and outlining.'
    },
    {
      img: "https://i.imgur.com/XbnrXmh.png",
      name: 'satin stitch',
      level: 'Beginner to Intermediate',
      type: 'Filling',
      notes: 'Used for filling large areas.Satin stitch is especially useful for creating color gradients.'
    },
    {
      img: "https://i.imgur.com/q7xDCjb.png",
      name: 'back stitch & satin stitch combo',
      level: 'Beginner to Intermediate',
      type: 'Filling or Line',
      notes: 'Used for filling large areas and outlining. Satin stitch is especially useful for creating color gradients.'
    },
    {
      img: "https://i.imgur.com/qaJzthS.jpg",
      name: 'french knot, stem stitch, and satin stitch combo',
      level: 'Beginner to Intermediate',
      type: 'Filling or Line',
      notes: 'Used for filling large areas and outlining. Satin stitch is especially useful for creating color gradients.'
    }
  ]
    try {
      const seedItems = await Stitches.create(newStitches)
      res.send(seedItems)
    } catch (err) {
      res.send(err.message)
    }
});

// Index Route
app.get('/welcomepage', (req, res) => { 
    Stitches.find({}, (error, newStitches) => { 
      //console.log(newStitches);
      res.render('index.ejs', { 
      stitches: newStitches 
    }) ;
  }) ;
});

// Show Route
app.get('/welcomepage/:id', (req, res) => { 
    Stitches.findById(req.params.id, (error, foundStitches) => { 
      res.render('show.ejs', { 
      stitch: foundStitches 
    }) ;
  }) ;
});

// Edited Stitches Put Route
app.put('/welcomepage/:id', (req, res) => {
  Stitches.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedStitches) => {
    res.redirect('/welcomepage');
  });
});

// Edit Route
app.get('/welcomepage/:id/edit', (req, res) => { 
    Stitches.findById(req.params.id, (error, editStitches) => { 
      res.render('edit.ejs', { 
      editedstitch: editStitches 
    }) ;
  }) ;
});

// New Stitch Post Route
app.post('/welcomepage', (req, res) => {
  Stitches.create(req.body, (err, addStitch) => {
    res.redirect('/welcomepage');
  });
});
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
