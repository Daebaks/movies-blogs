import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    <nav className="navbar" aria-label="Main navigation">
      <Link className="brand" to="/">
        Movies &amp; Stories
      </Link>
      <label htmlFor="toggle" className="toggle">
        <span aria-hidden="true">&#9776;</span>
        <span className="sr-only">Toggle navigation</span>
      </label>
      <input
        type="checkbox"
        className="nav-box"
        id="toggle"
        aria-label="Toggle navigation menu"
      />
      <div className="links">
        <label className="theme-toggle" htmlFor="theme-toggle">
          <span>Dark mode</span>
          <input
            id="theme-toggle"
            className="l"
            type="checkbox"
            onChange={handleChange}
            checked={value}
          />
        </label>
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
  );
};

export default Navbar;
