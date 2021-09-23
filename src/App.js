import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('user logging in:', username, password);
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log(exception);
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Login user={user} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin}/>
      {user ? blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      ) : null}
    </div>
  )
}

export default App