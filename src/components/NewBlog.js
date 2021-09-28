import React, { useState } from 'react';


const NewBlog = ({ createNewBlog, user }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async (event) => {
    event.preventDefault();
    console.log('button clicked', event.target);
    const newObject = {
      title: title,
      author: author,
      url: url
    };
    const newBlogCreated = await createNewBlog(newObject);
    if (newBlogCreated) {
      setTitle('');
      setAuthor('');
      setUrl('');
    }
  };

  if (user) {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input value={title} onChange={({ target }) => (setTitle(target.value))} />
          </div>
          <div>
            author:
            <input value={author} onChange={({ target }) => (setAuthor(target.value))} />
          </div>
          <div>
            url:
            <input value={url} onChange={({ target }) => (setUrl(target.value))} />
          </div>
          <button type='submit'>create</button>
        </form>
      </div>
    );
  } else {
    return null;
  }
};

export default NewBlog;