import React, { useState } from 'react';
const Blog = ({ blog, updateBlogLikes, deleteBlog, user }) => {
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
  const [likes, setLikes] = useState(blog.likes);
  const buttonLabel = visible ? 'hide' : 'view';
  const blogContent = () => {
    return (
      <div className='blog'>
        <div>{blog.url}</div>
        <div>
          likes {likes}
          <button style={buttonStyle} onClick={handleLikeBlog} className='likeButton'>like</button>
        </div>
        {blog.user && blog.user.name ? <div>{blog.user.name}</div> : null}
        {blog.user && blog.user.username === user.username
          ? <button onClick={handleDeleteBlog}>remove</button>
          : null
        }
      </div>
    );
  };
  // console.log('blog content:', blog);

  const handleLikeBlog = async () => {
    const blogToUpdate = {
      user: blog.user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    };
    // console.log('blog to update:', blogToUpdate);
    const updatedBlog = await updateBlogLikes(blogToUpdate, blog.id);
    if (updatedBlog && updatedBlog.id) {
      setLikes(likes + 1);
    }
    // console.log('updated blog:', updatedBlog);
  };

  const handleDeleteBlog = async () => {
    const result = window.confirm(`remove ${blog.title} by ${blog.author}?`);
    if (result) {
      console.log('blog to be removed:', blog.id);
      const result = await deleteBlog(blog.id);
      console.log('result', result);
    }
  };

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