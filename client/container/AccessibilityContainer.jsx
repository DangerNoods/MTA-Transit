import React from 'react';
import { useState, useEffect } from 'react';
import AccessibilityComponent from '../component/AccessiblityComponent.jsx';

const AccessibilityContainer = () => {

    const [stationsAcc, setStationsAcc] = useState ([])
    const [stationSelection, setStationSelection] = useState ('')

    const fetchData = async () => {
        try {
          const response = await fetch('/accessibility');
          const result = await response.json();

        //   setStationsAcc(result)
        
        let displayResult = []

        for (let i = 0; i < result.length; i++){
            if (result[i].station === stationSelection){
                displayResult.push(result[i])
            }
        }

        setStationsAcc(displayResult)

        //


        
        } catch (error){
            console.log('error')
        } 
    }

    useEffect(() => {
        fetchData()
    }, [stationSelection])

    //
    const handleChange = (e) =>{
      setStationSelection(e.target.value)
     }
    //

    const accessiblity = []

    for(let i = 0; i < stationsAcc.length; i++){
        accessiblity.push(
            <AccessibilityComponent
            station={stationsAcc[i].station}
            trainNo={stationsAcc[i].trainNo}
            outageDates={stationsAcc[i].outageDates}
            estimatedReturntoService={stationsAcc[i].estimatedReturntoService}
            ADA={stationsAcc[i].ADA}
          />
        )
    }

    console.log(accessiblity)

    return (
        <div>
        <h1>Accessiblity Page</h1>
        <select name="selectList" id="selectList" onChange={handleChange}>
            <option value="3 Av-149 St">3 Av-149 St</option>
            <option value="8 Av">8 Av</option>
            <option value="14 St">14 St</option>
            <option value="14 St-Union Sq">14 St-Union Sq</option>
            <option value="21 St-Queensbridge">21 St-Queensbridge</option>
            <option value="28 St">28 St</option>
            <option value="34 St-Herald Sq">34 St-Herald Sq</option>
            <option value="34 St-Penn Station">34 St-Penn Station</option>
            <option value="59 St">59 St</option>
            <option value="59 St-Columbus Circle">59 St-Columbus Circle</option>
            <option value="74 St-Broadway">74 St-Broadway</option>
            <option value="125 St">125 St</option>
            <option value="161 St-Yankee Stadium">161 St-Yankee Stadium</option>
            <option value="168 St">168 St</option>
            <option value="175 St">175 St</option>
            <option value="233 St">233 St</option>
            <option value="Court St">Court St</option>
            <option value="Cortlandt St">Cortlandt St</option>
            <option value="Dekalb Av">Dekalb Av</option>
            <option value="Euclid Av">Euclid Av</option>
            <option value="Fulton St">Fulton St</option>
            <option value="High St">High St</option>
            <option value="Intervale Av">Intervale Av</option>
            <options value ="Lexington Av/53 St">Lexington Av/53 St</options>
            <options value ="Lexington Av/59 St">Lexington Av/59 St</options>
            <options value ="Marcy Av">Marcy Av</options>
            <options value ="Parkchester">Parkchester</options>
            <options value ="Queens Plaza">Queens Plaza</options>
            <options value ="Roosevelt Island">Roosevelt Island</options>
            <options value ="Sutphin Blvd-Archer Av-JFK Airport">Sutphin Blvd-Archer Av-JFK Airport</options>
            <options value ="Time Sq-42 St">Time Sq-42 St</options>
            <options value ="W 4 St-Wash Sq">W 4 St-Wash Sq</options>
        </select>
        {accessiblity}
        </div>
    );
    

}

export default AccessibilityContainer