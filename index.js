const cons       = require('consolidate');
const path       = require('path');
const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');

// Init App
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log('Server started on port ' + port);
});

// Set Model
let Game = require('./models/game.js');

// Setup Database
mongoose.connect('mongodb://localhost/nodeGame', {useNewUrlParser: true});
let db = mongoose.connection;
// Check for DB connecion
db.once('open', () => {
  console.log('Connected to MongoDB');
});
// Check for DB error
db.on('error', (err) => {
  console.log(err);
});

// Set View to HTML files in views folder
// app.engine('pug', cons.swig); // assign swig engine to html files
app.set('view engine', 'pug'); // Set HTML
app.set('views', 'views');   // as default extension

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set Home Route
app.get('/', (req, res) => {
  Game.find({}, (err, games) => {
    if (err) {
      console.log(err);
    } else {
      if (games.length < 1) {
        console.log("Something went wrong, no games found in database.");
      } else {
        res.render('index', {games: games});
      }
    }
  });
});

app.get("/games/:id", (request, response) => {
  Game.findById(request.params.id, (err, game) => {
    if (err) {
      console.log("Error, couldn't find game with requested ID");
    } else {
      response.render('show', {game: game});
    }
  });
});

app.get("/modern-warfare-2", (req, res) => {
  res.render('modern-warfare-2');
});

// Set Get Route
app.get('/games', (req, res) => {
  Game.find({}, (err, games) => {
    console.log('Rendering Games: ' + games.length)
    if (err) {
      console.log(err);
    } else {
      res.render('games', { games: games});
    }
  });
});
