// import { useDispatch, useSelector } from "react-redux";
import React from "react";


const SubwayLineComponent = (props) => {

    return (
        <div className="totalBox">
            <div className="subwayLine" style = {{backgroundColor : props.color}}>
                <p className="number">{props.line}</p>
                {/* <span id="subwayLine"></span> */}
            </div>
            <div className="status">
                <p className="pLines"> {props.alerts}</p>
                <p className="pLines">Start: {props.start}</p>
                <p className="pLines">End: {props.end}</p>
                <span id="status"></span>
            </div>
            
        </div>
    )
}

export default SubwayLineComponent;
