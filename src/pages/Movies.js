import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../components/useFetch';
import '../styles/index.css';
import Mov from '../components/Mov';


const Movies = () => {
  const [clicked, setClicked] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { error, isPending, data } = useFetch(
    searchTerm
      ? `https://www.omdbapi.com/?s=${encodeURIComponent(
          searchTerm
        )}&apikey=${process.env.REACT_APP_API_KEY}`
      : null
  );
  const history = useHistory();
  const movies = data && data.Search ? data.Search : [];
  const searchError = error || (data && data.Response === 'False' && data.Error);
  const find = () => {
    if (!userInput.trim()) {
      return;
    }
    setSearchTerm(userInput.trim());
    setClicked(true);
  };
  const findEnter = (e) => {
    if (e.key === 'Enter') {
      find();
    }
  };
  const getUserInput = (e) => {
    setUserInput(e.target.value);
  };
  const goBack = () => {
    setClicked(false);
    setUserInput('');
    setSearchTerm('');
  };
  const goToRate = (movie) => {
    history.push({
      pathname: '/rating',
      state: {
        movie,
      },
    });
  };
  return (
    <div className="create">
      {clicked ? (
        <div>
          {isPending && <h1>Please wait...</h1>}
          {searchError && <h1>{searchError}</h1>}

          {!isPending && !searchError && movies.length === 0 && (
            <div>
              <h1>No such movie</h1>
              <button onClick={() => history.push('/')}>HOME</button>
            </div>
          )}
          <div className="grid">
            {movies.map((movie) => (
              <div key={movie.imdbID} className="search-result">
                <Mov
                  title={movie.Title}
                  year={movie.Year}
                  image={movie.Poster}
                />
                <button onClick={() => goToRate(movie)}>Rate movie</button>
              </div>
            ))}
          </div>
          <br />
          <button onClick={goBack}>Go Back</button>
        </div>
      ) : (
        <div>
          <div className="create-big">
            <label htmlFor="movie-search">Search a movie:</label>
            <input
              id="movie-search"
              type="text"
              value={userInput}
              onChange={getUserInput}
              onKeyDown={findEnter}
            />
          </div>
          <button onClick={find}>Search</button>
          <button onClick={() => history.push('/')}>HOME</button>
        </div>
      )}
    </div>
  );
};

export default Movies;
