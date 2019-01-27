import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: null,
      currentGenre: null,
    };

    this.searchGenre = this.searchGenre.bind(this);
    this.updateCurrentGenre = this.updateCurrentGenre.bind(this);
  }

  getGenres() {
    axios
      .get('http://localhost:3000/genres')
      .then(({ data }) => {
        this.setState({ genres: data.results });
      })
      .catch(err => console.log(err));
  }

  updateCurrentGenre(e) {
    this.setState({ currentGenre: e.target.value });
  }

  searchGenre() {
    // if (this.state.currentGenre) {
    this.props.getMovies(this.state.currentGenre);
    // }
  }

  componentDidMount() {
    this.getGenres();
  }

  render() {
    return (
      <div className="search">
        <button
          onClick={() => {
            this.props.swapFavorites();
          }}
        >
          {this.props.showFaves ? 'Show Results' : 'Show Favorites'}
        </button>
        <br />
        <br />
        <select
          value={this.state.currentGenre ? this.state.currentGenre : ''}
          onChange={this.updateCurrentGenre}
        >
          {this.state.genres
            ? this.state.genres.map(({ name, id }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))
            : ''}
        </select>
        {/* How can you tell which option has been selected from here? */}
        <br />
        <br />

        <button onClick={this.searchGenre}>Search</button>
      </div>
    );
  }
}

export default Search;
