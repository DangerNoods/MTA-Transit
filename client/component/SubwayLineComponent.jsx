// import { useDispatch, useSelector } from "react-redux";
import React from "react";


const SubwayLineComponent = (props) => {
    return (
        <div className="totalBox">
            <div className="subwayLine" style = {{backgroundColor : props.color}}>
                <p>{props.group}</p>
                <span id="subwayLine"></span>
            </div>
            <div className="status">
                <p>Alerts: {props.alerts}</p>
                <span id="status"></span>
            </div>
            <div className="additionalInformation">
                <p>Additional Information:</p>
                <p>Start: {props.start}</p>
                <p>End: {props.end}</p>
                <span id="subwayLine"></span>
            </div>
        </div>
    )
}

export default SubwayLineComponent;
