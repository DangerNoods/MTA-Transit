import React from 'react';
import { Link } from 'react-router-dom';

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
      <Link to={'/' + trainGroup}>
        <button
          name={trainGroup}
        //   onClick={handleNavClick}
          id={buttonNum}
        //   className={activeGroup === trainGroup ? 'active' : ''}
        >
          {trainGroupStr}
        </button>
      </Link>
    </>
  );
};

export default NavButtonComponent;
