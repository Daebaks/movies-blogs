import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faYoutube,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import '../styles/index.css';

const Footer = () => (
  <>
    <div className="footer">
      <ul className="social-list">
        <li className="social-list__item">
          <a
            className="social-list__link"
            href="https://github.com/daebaks"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="footer-icons"
              size="2x"
            />
          </a>
        </li>
        <li className="social-list__item">
          <a
            className="social-list__link"
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faYoutube}
              className="footer-icons"
              size="2x"
            />
          </a>
        </li>
        <li className="social-list__item">
          <a
            className="social-list__link"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              className="footer-icons"
              size="2x"
            />
          </a>
        </li>
      </ul>
    </div>
  </>
);

export default Footer;
