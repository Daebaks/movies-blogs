import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import useFetchFirebase from '../components/useFetchFirebase';
import { db } from '../firebase-config';

const BlogDetails = () => {
  const { id } = useParams();
  const { error, isPending, data: blogs } = useFetchFirebase('blogs', id);
  const blog = blogs[0];
  const history = useHistory();
  const [deleteError, setDeleteError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClick = async () => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteDoc(doc(db, 'blogs', id));
      history.push('/');
    } catch (error) {
      setDeleteError(
        error instanceof Error ? error.message : 'Failed to delete this blog.'
      );
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="line-details">
      {isPending && <div>Please Wait...</div>}
      {error && <div>{error}</div>}
      {!isPending && !error && !blog && <div>Blog not found.</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          {deleteError && <p role="alert">{deleteError}</p>}
          <button onClick={handleClick} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'delete Blog'}
          </button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
