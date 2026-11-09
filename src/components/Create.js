import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await addDoc(collection(db, 'blogs'), { title, body, author });
      history.push('/');
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to save your blog.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="create-big">
          <label>Title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Content:</label>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <label>Author:</label>
          <input
            type="text"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        {submitError && <p role="alert">{submitError}</p>}
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Add Blog'}
        </button>
      </form>
    </div>
  );
};

export default Create;
