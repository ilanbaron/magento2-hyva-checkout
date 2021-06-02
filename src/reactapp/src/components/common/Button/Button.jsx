/* eslint-disable react/button-has-type */
import React from 'react';
import { bool, func, node, oneOf } from 'prop-types';

function Button({ children, click, variant, disable }) {
  return (
    <div className="py-2">
      <button
        className={`btn ${variant === 'primary' ? 'btn-primary' : ''} ${
          variant === 'secondary' ? 'btn-secondary' : ''
        } ${!variant ? 'btn-utility' : ''} ${disable && 'opacity-50'} `}
        type="button"
        onClick={click}
        disabled={disable}
      >
        {children}
      </button>
    </div>
  );
}

Button.propTypes = {
  children: node.isRequired,
  click: func,
  disable: bool,
  big: bool,
  variant: oneOf(['success', 'warning']),
};

Button.defaultProps = {
  disable: false,
  variant: '',
  big: false,
  click: () => {},
};

export default Button;
