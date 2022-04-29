import React from 'react';
import { Link } from 'react-router-dom';
import BlogList from '../components/BlogList';
import '../styles/index.css';
import MovList from '../components/MovList';
import useFetchFirebase from '../components/useFetchFirebase';

const Home = () => {
  const { error, isPending, data: blogs } = useFetchFirebase('blogs');
  const { error: err, isPending: isP, data: movs } = useFetchFirebase('movs');
  return (
    <>
      <div className="main-container">
        <div className="main-container-mov">
          <Link className="linky" to="/movies">
            Click to add new rating
          </Link>
          <div className="home-1">
            {err && <div>{err}</div>}
            {isP && <div>Please Wait...</div>}
            {movs && <MovList movs={movs} />}
          </div>
        </div>

        <div className="main-container-blog">
          <Link className="linky" to="/create">
            Click to create new blog
          </Link>
          <div className="home-1">
            {error && <div>{error}</div>}
            {isPending && <div>Please Wait...</div>}
            {blogs && <BlogList blogs={blogs} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
