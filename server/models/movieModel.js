//SELECT one db to work with
//For SQL
// const sqlDb = require('../../db/sql');
//For Mongo
// const mongoDb = require('../../db/mongodb');

const mongoose = require('mongoose');

const Movies = new mongoose.Schema({
  movieId: Number,
  title: String,
  overview: String,
  voteAverage: Number,
  posterPath: String,
});

module.exports = mongoose.model('Movie', Movies);
