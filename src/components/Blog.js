import React, { useState } from 'react';
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const buttonStyle = {
    backgroundColor: '#ffffff',
    marginLeft: 8
  };

  const [visible, setVisible] = useState(false);
  const buttonLabel = visible ? 'hide' : 'view';
  const blogContent = () => {
    return (
      <div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button style={buttonStyle}>like</button>
        </div>
        {blog.user ? <div>{blog.user.name}</div> : null}
      </div>
    );
  };
  console.log('blog content:', blog);
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button style={buttonStyle} onClick={() => {setVisible(!visible);}}>
        {buttonLabel}
      </button>
      {visible ? blogContent() : null}
    </div>
  );
};

export default Blog;