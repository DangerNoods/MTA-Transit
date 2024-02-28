import React from 'react';
import { useState, useEffect } from 'react';
import SubwayLineComponent from '../component/SubwayLineComponent.jsx';
import NavButtonComponent from '../component/NavButtonComponent.jsx';
import LineButtonComponent from '../component/LineButtonComponent.jsx';

const MainContainer = () => {
  // [

  //   {
  //     group: '1,2,3',
  //     alerts: [],
  //   },
  // {
  //     group: '1,2,3',
  //     alerts: [],
  //   }
  // ];
  const [trainGroups, setTrainGroups] = useState([
    { group: '123', alerts: [] },
    { group: '456', alerts: [] },
    { group: '7', alerts: [] },
    { group: 'ACE', alerts: [] },
    { group: 'BDFM', alerts: [] },
    { group: 'G', alerts: [] },
    { group: 'L', alerts: [] },
    { group: 'NQRW', alerts: [] },
  ]);
  const [activeGroup, setActiveGroup] = useState('');
  //   const [color, setColor] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/subway');
      const result = await response.json();

      //   const bgColor = [];

      for (let i = 0; i < result.length; i++) {
        const element = result[i];

        const group = [...trainGroups];

        if (element[0] === '1' || element[0] === '2' || element[0] === '3') {
          group[0].alerts.push(element);
        } else if (
          element[0] === '4' ||
          element[0] === '5' ||
          element[0] === '6'
        ) {
          group[1].alerts.push(element);
        } else if (element[0] === '7') {
          group[2].alerts.push(element);
        } else if (
          element[0] === 'A' ||
          element[0] === 'C' ||
          element[0] === 'E'
        ) {
          group[3].alerts.push(element);
        } else if (
          element[0] === 'B' ||
          element[0] === 'D' ||
          element[0] === 'F' ||
          element[0] === 'M'
        ) {
          group[4].alerts.push(element);
        } else if (element[0] === 'G') {
          group[5].alerts.push(element);
        } else if (element[0] === 'L') {
          group[6].alerts.push(element);
        } else if (
          element[0] === 'N' ||
          element[0] === 'Q' ||
          element[0] === 'R' ||
          element[0] === 'W'
        ) {
          group[7].alerts.push(element);
        }
        setTrainGroups(group);
      }

      //   setColor(bgColor);
    } catch (error) {
      console.log('error');
    }
  };
  //   console.log(trainLine);

  //   const handleClick = () => {
  //     let filteredTrainLine = [];
  //     let filteredTrainStatus = [];
  //     let filteredStart = [];
  //     let filteredEnd = [];

  //     for (let i = 0; i < trainLine.length; i++) {
  //       if (
  //         trainLine[i] === '1' ||
  //         trainLine[i] === '2' ||
  //         trainLine[i] === '3'
  //       ) {
  //         filteredTrainLine.push(trainLine[i]);
  //         filteredTrainStatus.push(trainStatus[i]);
  //         filteredStart.push(start[i]);
  //         filteredEnd.push(end[i]);
  //       } else {
  //         break;
  //       }

  //       console.log(filteredTrainLine);
  //       console.log(filteredTrainStatus);
  //       console.log(filteredStart);
  //       console.log(filteredEnd, 'filteredEnd');
  //     }
  //   };

  const handleNavClick = (e) => {
    setActiveGroup(e.target.name);
    
  };
  console.log(activeGroup);

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
      />
    );
  }

  //   console.log("lines =" + navButtonsArr)

  const subwayLines = [];
  //going through the trainGroups array
  for (let i = 0; i < trainGroups.length; i++) {
    const element = trainGroups[i];

    const group = element.alerts;

    //going through each group alerts
    for (let j = 0; j < group.length; j++) {
      const alertelement = group[j];

      for (let k = 1; k < alertelement.length; k++) {
        const index = alertelement[0];

        const eachalert = alertelement[k];

        subwayLines.push(
          <SubwayLineComponent
            line={index}
            alerts={eachalert.message}
            start={eachalert.start}
            end={eachalert.end}
          />
        );
      }
    }
  }

  return (
    <div className="SubwayContainer">
      <h1>Subway Alerts</h1>
      <div>Subway Lines</div>
      <div id="buttons">
        {navButtonsArr}
        <button id="clearButton">Clear</button>
      </div>
      {/* <button onClick={handleClick()}>train (1,2,3)</button>
      <button>train(4,5,6)</button>
      <button>train 7</button>
      <button>train (A,C,E)</button>
      <button>train (B,D,F,M)</button>
      <button>train (G)</button>
      <button>train (L)</button>
      <button>train (N,G,R,W)</button> */}
      {subwayLines}
    </div>
  );
};

export default MainContainer;
