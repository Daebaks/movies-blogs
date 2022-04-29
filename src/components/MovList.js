import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../media/no.jpg';

const MovList = ({ movs }) => {
  const defaultSrc = (e) => {
    e.target.src = logo;
  };
  return (
    <div className="list-movies">
      {movs.map((mov) => (
        <div key={mov.id} className="line-preview">
          <Link to={`/movs/${mov.id}`}>
            <img
              src={mov.image}
              width="65"
              height="100"
              onError={defaultSrc}
              alt="movie-poster"
            />
            <h2>Title: {mov.title}</h2>
            <p>Year: {mov.year}</p>
            <p>Rating: {mov.overall}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MovList;
