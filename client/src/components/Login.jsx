import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getSession } from '../redux/selectors';
import { setSession } from '../redux/actions';
import constants from '../constants';
import Button from './Button';
import '../styles/login.scss'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [attemptingLogin, setAttemptingLogin] = useState(false);

  const validateForm = () => username.length && password.length;

  const handleUsernameChange = ({ target: { value } }) => {
    setUsername(value);
  }

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAttemptingLogin(true);

    try {
      const { data: user } = await axios.post(
        `${constants.API_URL}/users/login`,
        { username, password },
      );
      // TODO: Set session cookie in redux
    } catch (err) {
      // TODO: Indicate failed login and prompt retry
      alert(err.message);
    }
  }

  return (
    <div className="login">
      {attemptingLogin
        ? (
          <div>...</div>
        )
        : (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label for="username">Username</label>
              <input
                autofocus
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
        )}
    </div>
  )
}

const mapStateToProps = { getSession };

const mapDispatchToState = { setSession };

export default connect(mapStateToProps, mapDispatchToState)(Login);
