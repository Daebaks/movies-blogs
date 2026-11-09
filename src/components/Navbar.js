import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../styles/index.css';

const getInitialTheme = () => {
  try {
    return window.localStorage.getItem('theme') === 'dark';
  } catch (error) {
    console.error('Unable to read the saved theme.', error);
    return false;
  }
};

const Navbar = () => {
  const [value, setValue] = useState(getInitialTheme);
  const history = useHistory();

  useEffect(() => {
    const theme = value ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Unable to save the selected theme.', error);
    }
  }, [value]);

  const handleChange = (evt) => {
    setValue(evt.target.checked);
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
          <a href="https://aaweb.dev" target="_blank" rel="noopener noreferrer">
            PORTFOLIO
          </a>
          <a
            href="https://github.com/Daebaks/movies-blogs"
            target="_blank"
            rel="noopener noreferrer"
          >
            CODE
          </a>
          <Link to="/about">ABOUT</Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
