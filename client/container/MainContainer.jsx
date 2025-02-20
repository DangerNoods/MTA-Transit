import React from 'react';
import { useState } from 'react';

import NavButtonComponent from '../component/NavButtonComponent.jsx';
import LoginButton from '../component/LoginButton.jsx';
import { Link } from 'react-router-dom';

const MainContainer = () => {
  const [activeGroup, setActiveGroup] = useState('');

//   const handleNavClick = (e) => {
//     setActiveGroup(e.target.name);
//   };

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
   console.log(trainGroupsArr)
  for (let i = 0; i < trainGroupsArr.length; i++) {
    navButtonsArr.push(
      <NavButtonComponent
        trainGroup={trainGroupsArr[i]}
        // handleNavClick={handleNavClick}
        // activeGroup={activeGroup}
        buttonNum={buttonNumArr[i]}
        key={buttonNumArr[i]}
      />
    );
  }

  return (
    <div className="SubwayContainer">

      <div>Subway Lines</div>
      <div id="buttons">
        {navButtonsArr}
        <Link to={'/abc'}>
        <button id="accessibilityButton">Accessibility</button>
        
      </Link>
      
      </div>
      <img  className={'trainimage'} src ='https://assets3.thrillist.com/v1/image/2728617/792x528/scale;webp=auto;jpeg_quality=60;progressive.jpg'/>
    </div>
  );
};

export default MainContainer;
