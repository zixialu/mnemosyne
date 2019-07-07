import React from 'react';
import Button from './button';
import '../styles/header.scss';

class Header extends React.Component {
  render() {
    return (
      <header className="mn-header">
        <div className="mn-brand">mnemosyne</div>
        <Button className="login">+</Button>
      </header>
    );
  }
}

export default Header;
