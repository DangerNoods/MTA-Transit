import React from 'react';

const NavButtonComponent = ({ trainGroup, handleNavClick, activeGroup }) => {
  const trainGroupStr = trainGroup.split('').join(' ');
  return (
    <>
      <button name={trainGroup} onClick={handleNavClick} className={activeGroup === trainGroup? 'active' : ''}>
        Train {trainGroupStr}
      </button>
    </>
  );
};

export default NavButtonComponent;
