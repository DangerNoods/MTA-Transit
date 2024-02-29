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
    <div className="nav-container">
      <button id="sidebar-toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <CloseIcon fontSize="medium" color="black" /> : <MenuIcon fontSize="medium" color="black" />}
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li>
              <LoginButton />
            </li>
            <li>
              <Link to="/preferences">Preferences</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
