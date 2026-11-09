import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import Mov from '../components/Mov';
import { db } from '../firebase-config';

const Rating = () => {
  const history = useHistory();
  const location = useLocation();
  const movie = location.state && location.state.movie;
  const [review, setRev] = useState('');
  const [overall, setOverall] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const submitR = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await addDoc(collection(db, 'movs'), {
        title: movie.Title,
        year: movie.Year,
        review,
        image: movie.Poster,
        overall,
      });
      history.push('/');
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to save your rating.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRadio = (e) => {
    setOverall(e.target.value);
  };
  return (
    <>
      {!movie ? (
        <div className="create">
          <p>Choose a movie before submitting a rating.</p>
          <button onClick={() => history.push('/movies')}>SEARCH MOVIES</button>
        </div>
      ) : (
        <div className="create">
          <h1>RATE THIS MOVIE</h1>
          <div className="rate-mov">
            <Mov title={movie.Title} year={movie.Year} image={movie.Poster} />
          </div>
          <form onSubmit={submitR}>
            <div className="create-big">
              <label>Write a review:</label>
              <br />
              <textarea
                required
                value={review}
                onChange={(e) => setRev(e.target.value)}
              />
              <label>Overall:</label>
              <table>
                <tbody>
                  <tr>
                    <td> RECOMMEND </td>
                    <td width="40%">
                      <input
                        type="radio"
                        name="overall"
                        value="RECOMMEND"
                        checked={overall === 'RECOMMEND'}
                        onChange={handleRadio}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td> GOOD </td>
                    <td width="40%">
                      <input
                        type="radio"
                        name="overall"
                        value="GOOD"
                        checked={overall === 'GOOD'}
                        onChange={handleRadio}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td> 50/50 </td>
                    <td width="40%">
                      <input
                        type="radio"
                        name="overall"
                        value="50/50"
                        checked={overall === '50/50'}
                        onChange={handleRadio}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td> BAD </td>
                    <td width="40%">
                      <input
                        type="radio"
                        name="overall"
                        value="BAD"
                        checked={overall === 'BAD'}
                        onChange={handleRadio}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>NOT RECOMMEND </td>
                    <td width="40%">
                      <input
                        type="radio"
                        name="overall"
                        value="NOT RECOMMEND"
                        checked={overall === 'NOT RECOMMEND'}
                        onChange={handleRadio}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {submitError && <p role="alert">{submitError}</p>}
            <br />
            <br />
            <button disabled={isSubmitting}>
              {isSubmitting ? 'SAVING...' : 'SUBMIT RATING'}
            </button>
          </form>
          <button onClick={() => history.push('/movies')}>BACK</button>
          <button onClick={() => history.push('/')}>HOME</button>
        </div>
      )}
    </>
  );
};

export default Rating;
