import React from "react";

import SubwayLineComponent from "../component/SubwayLineComponent.jsx";

const MainContainer = (props) => {
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
}

export default MainContainer