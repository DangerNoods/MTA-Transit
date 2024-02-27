import React from 'react';
import SubwayLineComponent from '../component/SubwayLineComponent.jsx';
import { useState, useEffect } from 'react';

const App = () => {
  const SubwayContainer = (props) => {
    const subwayLines = [];

    for (let i = 0; i < props.trainLine.length; i++) {
      subwayLines.push(
        <SubwayLineComponent
          color={props.color[i]}
          trainLine={props.trainLine[i]}
          trainStatus={props.trainStatus[i]}
          start={props.start[i]}
          end={props.end[i]}
        />
      );
    }

    // for (let i = 0; i < props.trainLine.length; i++) {
    //   subwayLines.push(
    //     <SubwayLineComponent
    //       bgColor={props.bgColor[i]}
    //       trainLine={props.trainLine[i]}
    //     />
    //   );
    // }

    return (
      <div className="SubwayContainer">
        Subway Lines{' '}
        {/* <SubwayLineComponent
          bgColor={props.bgColor}
          trainLine={props.trainLine}
        /> */}
        {/* <SubwayLineComponent bgColor={props.bgColor} trainLine={props.trainLine} trainStatus={props.trainStatus}/> */}
        {subwayLines}
      </div>
    );
  };

  const [trainLine, setTrainLine] = useState([]);
  const [trainStatus, setTrainStatus] = useState([]);
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([]);
  const [color, setColor] = useState([]);

  // useEffect (()=> {
  //   const result = fetch('/subway', { method: 'GET' })
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((response) => {
  //     return response;
  //   })
  //   .catch((err) => {
  //     console.log('error');
  //   });
  // }, [])

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

      // console.log("TrainLines for Colors", trainLines)

      for (let i = 0; i < trainLines.length; i++) {
        let currentTrain = trainLines[i];
        switch (currentTrain) {
          case '1':
            bgColor.push('red');
            break;
          case '2':
            bgColor.push('red');
            break;
          case '3':
            bgColor.push('red');
            break;
          case '4':
            bgColor.push('green');
            break;
          case '5':
            bgColor.push('green');
            break;
          case '6':
            bgColor.push('green');
            break;
          case 'N':
            bgColor.push('yellow');
            break;
          case 'Q':
            bgColor.push('yellow');
            break;
          case 'R':
            bgColor.push('yellow');
            break;
          case 'W':
            bgColor.push('yellow');
            break;
          case 'B':
            bgColor.push('orange');
            break;
          case 'D':
            bgColor.push('orange');
            break;
          case 'F':
            bgColor.push('orange');
            break;
          case 'M':
            bgColor.push('orange');
            break;
          case 'A':
            bgColor.push('blue');
            break;
          case 'C':
            bgColor.push('blue');
            break;
          case 'E':
            bgColor.push('blue');
            break;
          case 'G':
            bgColor.push('lightgreen');
            break;
          case 'L':
            bgColor.push('gray');
            break;
          case 'J':
            bgColor.push('brown');
            break;
          case 'Z':
            bgColor.push('brown');
            break;
          case '7':
            bgColor.push('purple');
            break;
        }
      }

      console.log(bgColor);

      setColor(bgColor);
      setTrainLine(trainLines);
      setTrainStatus(trainStatuses);
      setStart(trainStart);
      setEnd(trainEnd);
    } catch (error) {
      console.log('error');
    }
  };

  // console.log(object)
  // console.log('abc', Object.keys(object))
  // let trainStatus = trainInfo[1].message

  // const lines = result[0];
  // const colors = [
  //   'red',
  //   'green',
  //   'purple',
  //   'blue',
  //   'orange',
  //   'lightgreen',
  //   'gray',
  //   'brown',
  //   'yellow',
  // ];

  // console.log(bgColor);

  return (
    <div>
      <h1>Subway Alerts</h1>
      <SubwayContainer
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
