import { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

const useFetchFirebase = (collectionName, documentId) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    const getData = async () => {
      setIsPending(true);
      setError(null);

      try {
        if (documentId) {
          const snapshot = await getDoc(doc(db, collectionName, documentId));
          if (isCurrent) {
            setData(
              snapshot.exists()
                ? [{ ...snapshot.data(), id: snapshot.id }]
                : []
            );
          }
        } else {
          const snapshot = await getDocs(collection(db, collectionName));
          if (isCurrent) {
            setData(
              snapshot.docs.map((item) => ({ ...item.data(), id: item.id }))
            );
          }
        }
      } catch (fetchError) {
        if (isCurrent) {
          setData([]);
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : 'Failed to load data from Firebase.'
          );
        }
      } finally {
        if (isCurrent) {
          setIsPending(false);
        }
      }
    }

    getData();
    return () => {
      isCurrent = false;
    };
  }, [collectionName, documentId]);

  return { data, isPending, error };
};

export default useFetchFirebase;
