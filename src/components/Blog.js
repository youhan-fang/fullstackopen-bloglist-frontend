import React, { useState } from 'react';
const Blog = ({ blog, updateBlogLikes, user }) => {
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
      <div>
        <div>{blog.url}</div>
        <div>
          likes {likes}
          <button style={buttonStyle} onClick={handleLikeBlog}>like</button>
        </div>
        {blog.user && blog.user.name ? <div>{blog.user.name}</div> : <div>{user.name}</div>}
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
    console.log('blog to update:', blogToUpdate);
    const updatedBlog = await updateBlogLikes(blogToUpdate, blog.id);
    if (updatedBlog.id) {
      setLikes(likes + 1);
    }
    console.log('updated blog:', updatedBlog);
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