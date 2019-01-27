const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file
module.exports = {
  getGenres: () =>
    axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    ),
  getMovies: ({ genre_id }) =>
    genre_id
      ? axios.get(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genre_id}&primary_release_date.lte=2018-1-1&sort_by=vote_average.asc&api_key=${API_KEY}`
        )
      : axios.get(
          `https://api.themoviedb.org/3/discover/movie?primary_release_date.lte=2018-1-1&sort_by=vote_average.asc&api_key=${API_KEY}`
        ),
};
