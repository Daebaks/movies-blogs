import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const history = useHistory();
  const collectionRef = collection(db, 'blogs');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collectionRef, {
      title: title,
      body: body,
      author: author,
    }).then(() => {
      history.push('/');
    });
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
        <button>Add Blog</button>
      </form>
    </div>
  );
};

export default Create;
