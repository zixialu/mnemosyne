import React from 'react';
import '../styles/button.scss';

function Button({
  children,
  onClick,
  type,
  disabled,
}) {
  return (
    <button
      className="btn"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
