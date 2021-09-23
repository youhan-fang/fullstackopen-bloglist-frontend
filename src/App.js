import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

  useEffect (() => {
    const userJson = window.localStorage.getItem('loggedUser');
    if (userJson) {
      setUser(JSON.parse(userJson));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('user logging in:', username, password);
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
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
      {user ? blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      ) : null}
    </div>
  )
}

export default App