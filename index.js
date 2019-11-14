const cons       = require('consolidate');
const path       = require('path');
const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');

// const config     = require('./config/db.js')

// Use Node's default promise instead of Mongoose's promise library
mongoose.Promise = global.Promise;

// Set Model
let Game = require('./models/game.js');

// Setup Database
mongoose.connect('mongodb://localhost/nodeGame', {useNewUrlParser: true});
// const connectionString = 'mongodb+srv://new-admin:oqB4x7YyYgjGuJMH@cluster0-zb5l0.mongodb.net/test?retryWrites=true&w=majority';
// mongoose.connect(connectionString, {useNewUrlParser: true});
let db = mongoose.connection;

// Check for DB connecion
db.once('open', () => {
  console.log('Connected to MongoDB');
});
// Check for DB error
db.on('error', (err) => {
  console.log(err);
});


// Init App
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server started on port ' + port);
});

// Set View to HTML files in views folder
// app.engine('pug', cons.swig); // assign swig engine to html files
app.set('view engine', 'pug'); // Set HTML
app.set('views', 'views');   // as default extension

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));


// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Home Route
app.get('/', async(req, res) => {
  Game.find({}, (err, games) => {
    if (err) {
      console.log(err);
    } else {
      console.log("HERE");
      if (games.length < 1) {
        console.log("Something went wrong, no games found in database.");
      } else {
        res.render('index', {games: games});
      }
    }
  });
  console.log("rendering games as null");
  res.render('index', {games: null });
});

// Get Specific Game Route
app.get("/games/:id", (request, response) => {
  Game.findById(request.params.id, (err, game) => {
    if (err) {
      console.log("Error, couldn't find game with requested ID");
    } else {
      response.render('show', {game: game});
    }
  });
});

// Set Get All Games Route
app.get('/games', (req, res) => {
  Game.find({}, (err, games) => {
    console.log('Rendering Games: ' + games.length);
    if (err) {
      console.log(err);
    } else {
      res.render('games', { games: games});
    }
  });
});

// Add Route to host Create Game Form
app.get('/create', (request, response) => {
  response.render("create");
});

// Create A Game Route
app.post('/create', async(request, response) => { // since mongoose functions are asynchronous
  // const newGame = new Game({"title": response.params.});
  console.log(request.body);
  let newGame = new Game({
     "title": request.body.titleInput,
     "rating": request.body.ratingInput,
     "price": request.body.priceInput,
     "description": request.body.descriptionInput,
     "publisher": request.body.publisherInput,
     "developer": request.body.developerInput
   });
   newGame.save((err) =>{
     if (err) {
       console.log("Error encountered while saving new Game: " + err);
       return;
     } else {
       console.log("here");
       response.redirect('/');
     }
   });
    // response.redirect("create");
});
