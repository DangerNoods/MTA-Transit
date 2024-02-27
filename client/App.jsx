import React from 'react';

import { useState, useEffect } from 'react';
import MainContainer from './container/MainContainer.jsx';
import NavContainer from './container/NavContainer.jsx';

const App = () => {
 
  
  const [trainLine, setTrainLine] = useState([]);
  const [trainStatus, setTrainStatus] = useState([]);
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([]);
  const [color, setColor] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/subway');
      const result = await response.json();

      const trainLines = [];
      const trainStatuses = [];
      const trainStart = [];
      const trainEnd = [];
      const bgColor = [];

      for (let i = 0; i < result.length; i++) {
        let empty = true;
        for (let j = 1; j < result[i].length; j++) {
          empty = false;
          trainLines.push(result[i][0]);
          trainStatuses.push(result[i][j].message);
          trainStart.push(result[i][j].start);
          trainEnd.push(result[i][j].end);
        }
        if (empty) {
          trainLines.push(result[i][0]);
          trainStatuses.push('Good');
          trainStart.push('N/A');
          trainEnd.push('N/A');
        }
      }

      setColor(bgColor);
      setTrainLine(trainLines);
      setTrainStatus(trainStatuses);
      setStart(trainStart);
      setEnd(trainEnd);
    } catch (error) {
      console.log('error');
    }
  };
  console.log(trainLine);

  const handleClick = () => {
    let filteredTrainLine = [];
    let filteredTrainStatus = [];
    let filteredStart = [];
    let filteredEnd = [];

    for (let i = 0; i < trainLine.length; i++) {
      if (
        trainLine[i] === '1' ||
        trainLine[i] === '2' ||
        trainLine[i] === '3'
      ) {
        filteredTrainLine.push(trainLine[i]);
        filteredTrainStatus.push(trainStatus[i]);
        filteredStart.push(start[i]);
        filteredEnd.push(end[i]);
      } else {
        break;
      }

      console.log(filteredTrainLine);
      console.log(filteredTrainStatus);
      console.log(filteredStart);
      console.log(filteredEnd, 'filteredEnd');
    }
    // setTrainLine(filteredTrainLine);
    // setTrainStatus(filteredTrainStatus);
    // setStart(filteredStart);
    // setEnd(filteredEnd);
  };

  return (
    <div>
      <h1>Subway Alerts</h1>
      <button onClick={handleClick()}>train (1,2,3)</button>
      <button>train(4,5,6)</button>
      <button>train 7</button>
      <button>train (A,C,E)</button>
      <button>train (B,D,F,M)</button>
      <button>train (G)</button>
      <button>train (L)</button>
      <button>train (N,G,R,W)</button>

      <MainContainer
        color={color}
        trainLine={trainLine}
        trainStatus={trainStatus}
        start={start}
        end={end}
      />
      <div></div>
    </div>
  );
};

export default App;
