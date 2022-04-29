import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../components/useFetch';
import '../styles/index.css';
import Mov from '../components/Mov';


const Movies = () => {
  
  const [clicked, setClicked] = useState(false);
  const [userInput, setUserInput] = useState('');
  const moviesObjectsArray = [];

  const { error, isPending, data } = useFetch(
    `https://www.omdbapi.com/?s=${userInput}&apikey=${process.env.REACT_APP_API_KEY}`
  );
  const history = useHistory();

  !error &&
    data &&
    data.Search &&
    data.Search.forEach((e) => {
      const obj = {
        key: Math.random(),
        title: e.Title,
        image: e.Poster,
        year: e.Year,
      };
      moviesObjectsArray.push(obj);
    });
  const find = () => {
    setClicked(true);
  };
  const findEnter = (e) => {
    e.key === 'Enter' && setClicked(true);
  };
  const getUserInput = (e) => {
    setUserInput(e.target.value);
  };
  const goBack = () => {
    setClicked(false);
    setUserInput('');
  };
  const goToRate = (id) => {
    history.push({
      pathname: '/rating',
      state: {
        theKey: id,
        theArray: moviesObjectsArray,
      },
    });
  };
  return (
    <div className="create">
      {clicked ? (
        <div>
          {isPending && <h1>Please wait...</h1>}
          {error && <h1>{error}</h1>}

          {moviesObjectsArray.length === 0 && (
            <div>
              <h1>No such movie</h1>
              <button onClick={goBack}>Go Back</button>
              <button onClick={() => history.push('/')}>HOME</button>
            </div>
          )}
          <div className="grid">
            {moviesObjectsArray.map((e, i) => (
              <div
                key={e.title + e.year + e.image + Math.random()}
                className="search-result"
              >
                <Mov title={e.title} year={e.year} image={e.image} />
                <button onClick={() => goToRate(e.key)}>Rate movie</button>
              </div>
            ))}
          </div>
          <br />
          {moviesObjectsArray.length !== 0 && (
            <button onClick={goBack}>Go Back</button>
          )}
        </div>
      ) : (
        <div>
          <div className="create-big">
            <label>Search a movie:</label>
            <input type="text" onChange={getUserInput} onKeyDown={findEnter} />
          </div>
          <button onClick={find}>Search</button>
          <button onClick={() => history.push('/')}>HOME</button>
        </div>
      )}
    </div>
  );
};

export default Movies;
