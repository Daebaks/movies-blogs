import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faYoutube,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import '../styles/index.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <p className="footer-note">Movies &amp; Stories · Made for fans.</p>
      <ul className="social-list" aria-label="Social links">
        <li className="social-list__item">
          <a
            className="social-list__link"
            href="https://github.com/daebaks"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="footer-icons"
            />
          </a>
        </li>
        <li className="social-list__item">
          <a
            className="social-list__link"
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FontAwesomeIcon
              icon={faYoutube}
              className="footer-icons"
            />
          </a>
        </li>
        <li className="social-list__item">
          <a
            className="social-list__link"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              className="footer-icons"
            />
          </a>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
