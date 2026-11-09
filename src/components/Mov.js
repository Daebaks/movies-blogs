import React from 'react';
import logo from '../media/no.jpg';

const Mov = (props) => {
  const defaultSrc = (e) => {
    e.target.src = logo;
  };
  return (
    <div className="mov-comp">
      <h2 title={props.title}>{props.title}</h2>
      <p>{props.year}</p>
      <img
        src={props.image}
        alt={`${props.title} poster`}
        onError={defaultSrc}
        width="320"
        height="400"
      />
    </div>
  );
};

export default Mov;
