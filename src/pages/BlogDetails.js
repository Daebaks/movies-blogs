import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import useFetchFirebase from '../components/useFetchFirebase';
import { db } from '../firebase-config';

const BlogDetails = () => {
  const { id } = useParams();
  const { error, isPending, data: blogs } = useFetchFirebase('blogs');
  const blog = blogs.find((blog) => blog.id === id);
  const history = useHistory();

  const handleClick = async () => {
    const blogToDelete = doc(db, 'blogs', id);
    await deleteDoc(blogToDelete);
    history.push('/');
  };
  return (
    <div className="line-details">
      {isPending && <div>Please Wait...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>delete Blog</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
