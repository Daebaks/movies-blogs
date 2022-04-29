import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import Mov from '../components/Mov';
import { db } from '../firebase-config';

const Rating = () => {
  const history = useHistory();
  const location = useLocation();
  const [id, setId] = useState('');
  const [arr, setArr] = useState([]);
  const [review, setRev] = useState('');
  const [title, setT] = useState('');
  const [image, setI] = useState('');
  const [year, setY] = useState('');
  const [overall, setOverall] = useState('');
  const collectionRef = collection(db, 'movs');

  useEffect(() => {
    setId(location.state.theKey);
    setArr(location.state.theArray);
    arr.forEach((e) => {
      if (e.key === id) {
        setT(e.title);
        setI(e.image);
        setY(e.year);
      }
    });
  }, [arr, id, location.state.theKey, location.state.theArray]);

  const submitR = async (e) => {
    e.preventDefault();
    await addDoc(collectionRef, {
      title: title,
      year: year,
      review: review,
      image: image,
      overall: overall,
    }).then(() => {
      history.push('/');
    });
  };

  const handleRadio = (e) => {
    setOverall(e.target.value);
  };
  return (
    <>
      {title === '' ? (
        <p>CHOOSE A MOVIE FIRST!!!</p>
      ) : (
        <div className="create">
          <h1>RATE THIS MOVIE</h1>
          <div className="rate-mov">
            <Mov title={title} year={year} image={image} />
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
            <br />
            <br />
            <button>SUBMIT RATING</button>
          </form>
          <button onClick={() => history.push('/movies')}>BACK</button>
          <button onClick={() => history.push('/')}>HOME</button>
        </div>
      )}
    </>
  );
};

export default Rating;
