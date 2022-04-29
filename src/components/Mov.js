import React from 'react';
import logo from '../media/no.jpg';

const Mov = (props) => {
  const defaultSrc = (e) => {
    e.target.src = logo;
  };
  return (
    <div className="mov-comp">
      <h1>Title: {props.title}</h1>
      <h1>Year: {props.year}</h1>
      <img
        src={props.image}
        alt="no-poster"
        onError={defaultSrc}
        width="320"
        height="400"
      />
    </div>
  );
};

export default Mov;
