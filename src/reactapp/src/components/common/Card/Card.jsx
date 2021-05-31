import React from 'react';
import { node, string } from 'prop-types';

function Card({ children, bg, classes }) {
  return (
    <div
      className={`card w-full h-full p-4 border border-gray-lighter ${
        bg === 'dark' ? 'bg-gray-lightest' : 'bg-white'
      } ${classes}`}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: node,
  bg: string,
  classes: string,
};

Card.defaultProps = {
  bg: '',
  classes: '',
};

export default Card;
