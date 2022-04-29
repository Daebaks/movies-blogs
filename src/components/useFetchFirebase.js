import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

const useFetchFirebase = (d_b) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const collectionRef = collection(db, d_b);

  const getData = async () => {
    setIsPending(true);
    const dt = await getDocs(collectionRef);
    setData(dt.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setIsPending(false);
  };
  useEffect(() => {
    getData();
    if (data === []) {
      setError('failed to get data from source');
    } else {
      setError(null);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return { data, isPending, error };
};
export default useFetchFirebase;
