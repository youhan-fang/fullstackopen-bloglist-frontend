import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import NewBlog from './components/NewBlog';
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
    } catch (exception) {
      alert('wrong credentials');
      console.log(exception);
    }
  }

  const handleLogout = (event) => {
    setUser(null);
    window.localStorage.removeItem('loggedUser');
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault();
    console.log('submitted blog:', title, author, url);
    try {
      const createdBlog = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(createdBlog));
      console.log('created blog:', createdBlog);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      console.log(exception);
    }
  }

  return (
    <div>
      <h2>blogs</h2>
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