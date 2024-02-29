import React from "react";

const AccessibilityComponent = (props) => {

    return (
        <div className="accessibilityTotalComponent">
          
          <div className="station">
            <p className="eachstation">{props.station}</p>
          </div>

          <div className="trainNo">
            <p className="eachstation"> Trainlines: {props.trainNo}</p>
          </div>
          
          <div className="outageDates">
            <p className="eachstation">Outage Dates: {props.outageDates}</p>
          </div>
          
          <div className="estimatedReturntoService">
            <p className="eachstation">Est. Return to Service: {props.estimatedReturntoService}</p>
          </div>

          <div className="ADA">
            <p className="eachstation"> Handicap Accessible: {props.ADA}</p>
          </div>

        </div>
    )

}

export default AccessibilityComponent;