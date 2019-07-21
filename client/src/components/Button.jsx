import React from 'react';
import '../styles/button.scss';

function Button({ onClick, type, children }) {
  return (
    <button className="btn" onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export default Button;
