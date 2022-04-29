import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';

const NotFound = () => (
  <div className="create">
    <h2>WHOOOPPPS...</h2>
    <p>Page can not be found</p>
    <Link to="/">GO TO HOME PAGE</Link>
  </div>
);

export default NotFound;
