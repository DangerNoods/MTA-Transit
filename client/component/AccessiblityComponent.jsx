import React from "react";

const AccessibilityComponent = (props) => {

    return (
        <div className="accessibilityTotalComponent">
          
          <div className="station">
            <p className="eachstation">{props.station}</p>
          </div>

          <div className="trainNo">
            <p> Trainlines: {props.trainNo}</p>
          </div>
          
          <div className="outageDates">
            <p>Outage Dates: {props.outageDates}</p>
          </div>
          
          <div className="estimatedReturntoService">
            <p>Est. Return to Service: {props.estimatedReturntoService}</p>
          </div>

          <div className="ADA">
            <p> Handicap Accessible: {props.ADA}</p>
          </div>

        </div>
    )

}

export default AccessibilityComponent;