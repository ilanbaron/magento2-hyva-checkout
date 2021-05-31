import React, { useState } from 'react';
import { bool, node } from 'prop-types';

import Header from '../Header';
import { ArrowUpIcon, ArrowDownIcon } from '../icons';

function ToggleBox({ children, title, show }) {
  const [open, setOpen] = useState(show);

  const arrowContent = (
    <div className="flex items-center justify-center">
      {open && <ArrowUpIcon />}
      {!open && <ArrowDownIcon />}
    </div>
  );

  return (
    <div className="">
      <Header
        extra={arrowContent}
        onClick={() => setOpen(!open)}
        onKeyPress={() => setOpen(!open)}
      >
        {title}
      </Header>
      <div style={{ display: open ? 'block' : 'none' }}>{children}</div>
    </div>
  );
}

ToggleBox.propTypes = {
  children: node.isRequired,
  title: node.isRequired,
  show: bool,
};

ToggleBox.defaultProps = {
  show: false,
};

export default ToggleBox;
