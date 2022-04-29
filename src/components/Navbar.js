import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../styles/index.css';

const Navbar = () => {
  function getLocalStorageItem(key, initialValue) {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  }

  function setLocalStorageItem(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
    try {
      // Convert the value to a JSON string
      const item = JSON.stringify(value);
      // Save to local storage
      window.localStorage.setItem(key, item);
    } catch (error) {
      console.log(error);
    }
  }

  const [value, setvalue] = useState(getLocalStorageItem('val', ''));
  const history = useHistory();

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme')
      ? localStorage.getItem('theme')
      : null;
    document.documentElement.setAttribute('data-theme', currentTheme);
  });

  const handleChange = (evt) => {
    const val = evt.target.checked;
    setvalue(val);
    setLocalStorageItem('val', val);
    if (evt.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <>
      <label htmlFor="toggle" className="toggle">
        &#9776;
      </label>
      <nav className="navbar">
        <h1 onClick={() => history.push('/')}>
          Movies and Blogs (with ReactJS)
        </h1>
        <input type="checkbox" className="nav-box" id="toggle" />
        <div className="links">
          {/** theme **/}
          <input
            className="l"
            type="checkbox"
            onChange={handleChange}
            checked={value}
          />
          <Link to="/">HOME</Link>
          <Link to={{ pathname: 'https://aaweb.dev' }} target="_blank">
            PORTFOLIO
          </Link>
          <Link
            to={{ pathname: 'https://github.com/Daebaks/movies-blogs' }}
            target="_blank"
          >
            CODE
          </Link>
          <Link to="/about">ABOUT</Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
