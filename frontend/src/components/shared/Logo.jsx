import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/expenselogo.png'; 

const Logo = () => {
  return (
    <Link to="/">
      <img
        src={logo}
        alt="logo"
        className="w-20 h-20 object-contain block"
        style={{ maxWidth: '4rem', maxHeight: '4rem' }} 
      />
    </Link>
  );
};

export default Logo;
