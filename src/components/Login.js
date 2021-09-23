import React from 'react';

const Login = ({ handleLogin, setUsername, setPassword, user}) => {
  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input onChange={({ target }) => (setUsername(target.value))}/>
          </div>
          <div>
            password
            <input onChange={({ target }) => (setPassword(target.value))}/>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    );
  } else {
    return (
      <p>
        {user.name} logged in
      </p>
    );
  }
}

export default Login;
