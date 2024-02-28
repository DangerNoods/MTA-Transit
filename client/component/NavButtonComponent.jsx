import React from 'react';

const NavButtonComponent = ({
  trainGroup,
  handleNavClick,
  activeGroup,
  buttonNum,
}) => {
  const trainGroupStr = trainGroup.split('').join(' ');

  //from return : {activeGroup === trainGroup? 'active' : ''}

  return (
    <>
      <button
        name={trainGroup}
        onClick={handleNavClick}
        id={buttonNum}
        className={activeGroup === trainGroup ? 'active' : ''}
      >
        {trainGroupStr}
      </button>
    </>
  );
};

export default NavButtonComponent;
