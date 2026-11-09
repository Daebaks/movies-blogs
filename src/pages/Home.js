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
          <div className="panel-heading">
            <h2>Movie ratings</h2>
            <Link className="linky" to="/movies">
              Add a rating
            </Link>
          </div>
          <div className="home-1">
            {err && <div>{err}</div>}
            {isP && <div>Please Wait...</div>}
            {movs && <MovList movs={movs} />}
          </div>
        </div>

        <div className="main-container-blog">
          <div className="panel-heading">
            <h2>Latest stories</h2>
            <Link className="linky" to="/create">
              Write a story
            </Link>
          </div>
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
