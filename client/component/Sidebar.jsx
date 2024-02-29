import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import LoginButton from './LoginButton.jsx';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleSidebar}>
        {isOpen ? <CloseIcon fontSize="medium" color="primary" /> : <MenuIcon fontSize="medium" color="primary" />}
      </button>
      <nav>
        <ul>
          <li>
            <LoginButton />
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
