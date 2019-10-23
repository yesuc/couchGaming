let mongoose = require('mongoose');
// db.games.insert({"title": "Kingdom Hearts 3", "rating": NumberDecimal("8.67"), "description": "", "price": NumberDecimal("50.00"), "publisher": "Square Enix", "developer": "Square Enix"});

// Game Schema
let gameSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  developer: {
    type: String,
    required: true,
  },
});

let Game = module.exports = mongoose.model('Game', gameSchema);
