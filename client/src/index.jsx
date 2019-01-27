import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx';
import Movies from './components/Movies.jsx';

const API_KEY = '280f3eec57d5e5670688134510ec83c7';
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.aesc`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [{ deway: 'movies' }],
      favorites: [{ deway: 'favorites' }],
      showFaves: false,
    };

    // you might have to do something important here!
  }

  getMovies() {
    // make an axios request to your server on the GET SEARCH endpoint
    // find movies by bad rating
    axios.get(`${API_URL}&api_key=${API_KEY}`).then(({ data }) => {
      // set the state (movies) to the response
      console.log(data.results);
      this.setState({ movies: data.results });
    });
  }

  saveMovie() {
    // same as above but do something diff
  }

  deleteMovie() {
    // same as above but do something diff
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves,
    });
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    return (
      <div className="app">
        <header className="navbar">
          <h1>Bad Movies</h1>
        </header>

        <div className="main">
          <Search
            swapFavorites={this.swapFavorites}
            showFaves={this.state.showFaves}
          />
          <Movies
            movies={
              this.state.showFaves ? this.state.favorites : this.state.movies
            }
            showFaves={this.state.showFaves}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
