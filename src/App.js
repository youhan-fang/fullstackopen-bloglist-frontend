import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Toggleble from './components/Toggleble';
import blogService from './services/blogs';
import loginService from './services/login';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const loginFormRef = useRef();
  const newBlogFormRef = useRef();

  const loginForm = () => {
    return (
      <Login
        user={user}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
    );
  };

  const newBlogForm = () => {
    return (
      <Toggleble buttonLabel='create new blog' ref={newBlogFormRef}>
        <NewBlog
          user={user}
          createNewBlog={createNewBlog}
        />
      </Toggleble>
    );
  };

  useEffect(() => {
    const getAllBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs( blogs );
    };
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
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('user logging in:', username, password);
    // console.log('formRef:', loginFormRef.current);
    // loginFormRef.current.toggleVisibility();
    try {
      const user = await loginService.login({ username, password });
      console.log('formRef:', loginFormRef.current);
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
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedUser');
    showNotification('logged out successfully');
  };

  const createNewBlog = async (newObject) => {
    try {
      const createdBlog = await blogService.create(newObject);
      newBlogFormRef.current.toggleVisibility();
      console.log('created blog:', createdBlog);
      setBlogs(blogs.concat(createdBlog));
      showNotification('new blog added succesfully');
      return true;
    } catch (exception) {
      showNotification(exception.response.data.error, 'error');
      console.log('exception', JSON.stringify(exception.response));
      return false;
    }
  };

  const updateBlogLikes = async (objectToUpdate, id) => {
    try {
      const updatedBlog = await blogService.update(objectToUpdate, id);
      console.log('updated blog:', updatedBlog);
      return updatedBlog;
    } catch (exception) {
      showNotification(exception.response.data.error, 'error');
      console.log('exception', JSON.stringify(exception.response));
      return null;
    }
  };

  let blogsToShow = [...blogs];
  blogsToShow.sort((blog1, blog2) => {
    return blog2.likes - blog1.likes;
  });

  return (
    <div>
      <h2>blogs</h2>
      { message ? <Notification message={message} /> : null}
      {loginForm()}
      {user ? newBlogForm() : null}
      {user ? blogsToShow.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} updateBlogLikes={updateBlogLikes}/>
      ) : null}
    </div>
  );
};

export default App;