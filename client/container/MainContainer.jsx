import React from 'react';
import { useState } from 'react';

import NavButtonComponent from '../component/NavButtonComponent.jsx';

const MainContainer = () => {
  const [activeGroup, setActiveGroup] = useState('');

  const handleNavClick = (e) => {
    setActiveGroup(e.target.name);
  };

  const trainGroupsArr = ['123', '456', '7', 'ACE', 'BDFM', 'G', 'L', 'NQRW'];
  const navButtonsArr = [];
  const buttonNumArr = [
    'button1',
    'button2',
    'button3',
    'button4',
    'button5',
    'button6',
    'button7',
    'button8',
  ];

  for (let i = 0; i < trainGroupsArr.length; i++) {
    navButtonsArr.push(
      <NavButtonComponent
        trainGroup={trainGroupsArr[i]}
        handleNavClick={handleNavClick}
        activeGroup={activeGroup}
        buttonNum={buttonNumArr[i]}
        key={buttonNumArr[i]}
      />
    );
  }

  return (
    <div className="SubwayContainer">
      <h1>Subway Alerts</h1>
      <div>Subway Lines</div>
      <div id="buttons">
        {navButtonsArr}
      </div>
    </div>
  );
};

export default MainContainer;
