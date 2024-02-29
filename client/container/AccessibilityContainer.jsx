import React from 'react';
import { useState, useEffect } from 'react';
import AccessibilityComponent from '../component/AccessiblityComponent.jsx';

const AccessibilityContainer = () => {

    const [stationsAcc, setStationsAcc] = useState ([])

    const fetchData = async () => {
        try {
          const response = await fetch('/accessibility');
          const result = await response.json();
          console.log(result)
          
        //   let accessibilityData = []
        //   result.forEach((outage) => {
        //     accessibilityData.push(outage)
        //   })

          setStationsAcc(result)
        
        } catch (error){
            console.log('error')
        } 
    }

    useEffect(() => {
        fetchData()
    }, [])

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
        {accessiblity}
        </div>
    );
    

}

export default AccessibilityContainer