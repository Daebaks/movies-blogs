import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import logo from '../media/no.jpg';
import useFetchFirebase from '../components/useFetchFirebase';
import { db } from '../firebase-config';

const MovDetails = () => {
  const { id } = useParams();
  const { error, isPending, data: movs } = useFetchFirebase('movs', id);
  const mov = movs[0];
  const history = useHistory();
  const [deleteError, setDeleteError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const defaultSrc = (e) => {
    e.target.src = logo;
  };
  const handleClick = async () => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteDoc(doc(db, 'movs', id));
      history.push('/');
    } catch (error) {
      setDeleteError(
        error instanceof Error ? error.message : 'Failed to delete this rating.'
      );
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="line-details">
      {isPending && <div>Please Wait...</div>}
      {error && <div>{error}</div>}
      {!isPending && !error && !mov && <div>Rating not found.</div>}
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
          {deleteError && <p role="alert">{deleteError}</p>}
          <button onClick={handleClick} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'delete rating'}
          </button>
        </article>
      )}
    </div>
  );
};

export default MovDetails;
