import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setError(null);
      setIsPending(false);
      return undefined;
    }

    const controller = new AbortController();
    let isCurrent = true;
    setData(null);
    setError(null);
    setIsPending(true);

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error('Could not fetch the data for that resource.');
        }
        const result = await response.json();
        if (isCurrent) {
          setData(result);
        }
      } catch (fetchError) {
        if (isCurrent && fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Failed to fetch data.');
        }
      } finally {
        if (isCurrent) {
          setIsPending(false);
        }
      }
    };

    fetchData();
    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
