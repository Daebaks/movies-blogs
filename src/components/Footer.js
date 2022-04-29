import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faYoutube,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import '../styles/index.css';

const Footer = () => (
  <>
    <div className="footer">
      <ul className="social-list">
        <li className="social-list__item">
          <Link
            className="social-list__link"
            to={{ pathname: 'https://github.com/daebaks' }}
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="footer-icons"
              size="2x"
            />
          </Link>
        </li>
        <li className="social-list__item">
          <Link
            className="social-list__link"
            to={{ pathname: 'https://youtube.com' }}
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faYoutube}
              className="footer-icons"
              size="2x"
            />
          </Link>
        </li>
        <li className="social-list__item">
          <Link
            className="social-list__link"
            to={{ pathname: 'https://twitter.com' }}
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              className="footer-icons"
              size="2x"
            />
          </Link>
        </li>
      </ul>
    </div>
  </>
);

export default Footer;
