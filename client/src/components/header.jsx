import React from 'react';
import Button from './button';
import '../styles/header.scss';

function Header() {
  return (
    <header className="mn-header">
      <div className="mn-brand">mnemosyne</div>
      <Button className="login">+</Button>
    </header>
  );
}

export default Header;
