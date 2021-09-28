import React from 'react';

const NewBlog = (props) => {
  if (props.user) {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={props.handleBlogCreation}>
          <div>
            title:
            <input value={props.title} onChange={({ target }) => (props.setTitle(target.value))} />
          </div>
          <div>
            author:
            <input value={props.author} onChange={({ target }) => (props.setAuthor(target.value))} />
          </div>
          <div>
            url:
            <input value={props.url} onChange={({ target }) => (props.setUrl(target.value))} />
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