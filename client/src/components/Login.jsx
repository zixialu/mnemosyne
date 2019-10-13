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
      const { data } = await axios.post(
        `${constants.API_URL}/users/login`,
        { username, password },
      );
      // TODO: Set session cookie in redux
      console.log(data);
      // this.props.setSession(...)
    } catch (err) {
      // TODO: Indicate failed login and prompt retry
      alert(err.message);
    } finally {
      setAttemptingLogin(false);
    }
  }

  const echoSession = async (event) => {
    const { data } = await axios.get(
      `${constants.API_URL}/users/echo-session`,
    );
    alert(JSON.stringify(data));
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
              <label htmlFor="username">Username</label>
              <input
                autoFocus
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
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
        )
      }
      <button onClick={echoSession}>echo session</button>
    </div>
  )
}

const mapStateToProps = state => ({
  session: getSession(state),
});

const mapDispatchToState = { setSession };

export default connect(mapStateToProps, mapDispatchToState)(Login);
