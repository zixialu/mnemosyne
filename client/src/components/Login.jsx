import React, { useState } from 'react';
import Button from './Button';
import '../styles/login.scss'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => username.length && password.length;

  const handleUsernameChange = ({ target: { value } }) => {
    setUsername(value);
  }

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>

        <div className="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <Button
          type="submit"
          disabled={!validateForm()}
        >
          Login
        </Button>
      </form>
    </div>
  )
}

export default Login;
