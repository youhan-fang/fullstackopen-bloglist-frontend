import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const getAllBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs( blogs );
    }
    getAllBlogs();
  }, []);

  useEffect (() => {
    const userJson = window.localStorage.getItem('loggedUser');
    if (userJson) {
      const currentUser = JSON.parse(userJson);
      setUser(currentUser);
      blogService.setToken(currentUser.token);
    }
  }, []);

  const showNotification = (message, type) => {
    setMessage({
      message,
      type
    });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('user logging in:', username, password);
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      showNotification('logged in successfully');
    } catch (exception) {
      showNotification(exception.response.data.error, 'error');
      console.log(exception);
    }
  }

  const handleLogout = (event) => {
    setUser(null);
    window.localStorage.removeItem('loggedUser');
    showNotification('logged out successfully');
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault();
    console.log('submitted blog:', title, author, url);
    try {
      const createdBlog = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(createdBlog));
      console.log('created blog:', createdBlog);
      showNotification('new blog added succesfully');
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      showNotification(exception.response.data.error, 'error');
      console.log('exception', JSON.stringify(exception.response));
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      { message ? <Notification message={message} /> : null}
      <Login 
        user={user} 
        setUsername={setUsername} 
        setPassword={setPassword} 
        handleLogin={handleLogin} 
        handleLogout={handleLogout}
      />
      <NewBlog 
        user={user}
        title={title}
        author={author}
        url={url}
        setTitle={setTitle} 
        setAuthor={setAuthor} 
        setUrl={setUrl} 
        handleBlogCreation={handleBlogCreation}
      />
      {user ? blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      ) : null}
    </div>
  )
}

export default App