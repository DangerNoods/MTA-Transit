import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SubwayLineComponent from '../component/SubwayLineComponent.jsx';
import LineButtonComponent from '../component/LineButtonComponent.jsx';

const TrainGroupContainer = () => {
  const { currTrainGroup } = useParams();

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/subway');
      const result = await response.json();

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
    } catch (error) {
      console.log('error');
    }
  };

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

  // creating LineButtonComponents
  const lineButtonCompArr = [];

  for (let i = 0; i < currTrainGroup.split('').length; i++) {
    lineButtonCompArr.push(
      <LineButtonComponent
        line={currTrainGroup[i]}
        currTrainGroup={currTrainGroup}
      />
    );
  }

  return (
    <>
      <div className="line-btn-container">{lineButtonCompArr}</div>
      <div>{subwayLines}</div>
    </>
  );
};

export default TrainGroupContainer;
