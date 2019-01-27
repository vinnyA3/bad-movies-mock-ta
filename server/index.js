const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
const db = require('../db/mongodb/index');
const Movie = require('./models/movieModel');
const app = express();

// Sign up and get your moviedb API key here:
// https://www.themoviedb.org/account/signup

//Helpers
const apiHelpers = require('./helpers/apiHelpers.js');

app.use(cors());
//Middleware
app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));

//OPTION 1: Use regular routes

// make an axios request to get the official list of genres from themoviedb
// use this endpoint. you will need your API key from signup: https://api.themoviedb.org/3/genre/movie/list
// send back
app.get('/genres', (req, res) =>
  apiHelpers
    .getGenres()
    .then(({ data }) => res.status(200).send({ results: data.genres }))
    .catch(err =>
      res.status(500).send({ message: 'Failed to fetch genres!', err })
    )
);

// use this endpoint to search for movies by genres (using API key): https://api.themoviedb.org/3/discover/movie
// and sort them by votes (worst first) using the search parameters in themoviedb API
// req.genre_id
app.get('/search', (req, res) => {
  Movie.find().then(favs => {
    return apiHelpers
      .getMovies({ genre_id: req.query.genre_id })
      .then(({ data }) =>
        res.status(200).send({ results: data.results, favorites: favs })
      )
      .catch(err =>
        res.status(500).send({ message: 'Failed to fetch movies!', err })
      );
  });
});

app.post('/save', function(req, res) {
  const { body } = req;
  //save movie as favorite
  // search for the movie in the Movies collection
  // if the movie already exists ....
  // .. return err (movie already exists)
  // otherwise
  // .. save the movie in the database
  Movie.find({ movieId: body.id })
    .then(movie => {
      if (movie[0]) {
        res.status(400).send({ message: 'Movie already exists' });
      } else {
        Movie.create({
          movieId: body.id,
          title: body.title,
          overview: body.overview,
          voteAverage: body.vote_avg,
          posterPath: body.posterPath,
        })
          .then(movie => {
            console.log(movie);
            res.send({ result: movie });
          })
          .catch(err =>
            res
              .status(500)
              .send({ message: 'Oops, something went wrong!', err })
          );
      }
    })
    .catch(err =>
      res.status(500).send({ message: 'Oops, something went wrong!', err })
    );
});

app.post('/delete', function(req, res) {
  //remove movie from favorites
});

//OPTION 2: Use Express Router

//IF you decide to go with this option, delete OPTION 1 to continue

//Routes

const movieRoutes = require('./routes/movieRoutes.js');

//Use routes
app.use('/movies', movieRoutes);

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
