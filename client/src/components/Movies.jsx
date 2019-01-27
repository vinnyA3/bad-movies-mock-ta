import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props);
  }

  // Make an onClick for each list item. If the movies shown is the search results,
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  render() {
    // <img src={movie.poster.path} />
    const renderMovies = movies => {
      return movies.map(movie => {
        return (
          <li className="movie_item" key={movie.id}>
            <div className="movie_description">
              <img
                src={
                  'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' +
                  movie.poster_path
                }
              />
              <h2>{movie.title}</h2>
              <section className="movie_details">
                <div className="movie_year">
                  <span className="title">Year</span>
                  <span>{movie.release_date}</span>
                </div>
                <div className="movie_rating">
                  <span className="title">Rating</span>
                  <span>{movie.vote_average}</span>
                </div>
              </section>
            </div>
          </li>
        );
      });
    };
    return <ul className="movies"> {renderMovies(this.props.movies)} </ul>;
  }
}

export default Movies;
