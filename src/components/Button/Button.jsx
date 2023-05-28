import React from 'react';
import PropTypes from 'prop-types';
import CSS from './Button.module.css';

export const Button = ({ onClick, children }) => (
  <button onClick={onClick} className={CSS.loadMore} type="button">
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
