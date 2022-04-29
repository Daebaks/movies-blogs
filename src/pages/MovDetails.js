import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import logo from '../media/no.jpg';
import useFetchFirebase from '../components/useFetchFirebase';
import { db } from '../firebase-config';

const MovDetails = () => {
  const { id } = useParams();
  const { error, isPending, data: movs } = useFetchFirebase('movs');
  const mov = movs.find((mov) => mov.id === id);
  const history = useHistory();

  const defaultSrc = (e) => {
    e.target.src = logo;
  };
  const handleClick = async () => {
    const movToDelete = doc(db, 'movs', id);
    await deleteDoc(movToDelete);
    history.push('/');
  };
  return (
    <div className="line-details">
      {isPending && <div>Please Wait...</div>}
      {error && <div>{error}</div>}
      {mov && (
        <article>
          <h2>{mov.title}</h2>
          <p>Year: {mov.year}</p>
          <p> Overall: {mov.overall}</p>
          <img
            src={mov.image}
            width="400"
            height="565"
            onError={defaultSrc}
            alt="movie-poster"
          />
          <div>
            Review: <br />
            {mov.review}
          </div>
          <button onClick={handleClick}>delete rating</button>
        </article>
      )}
    </div>
  );
};

export default MovDetails;
