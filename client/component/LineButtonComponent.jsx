import React from 'react';
import SubwayLineComponent from './SubwayLineComponent.jsx';
import {Link} from 'react-router-dom'

const LineButtonComponent = ({ line, subwaylines }) => {

  const specLine = [];

  


  // <Link to={'/' + line}>
  //       <button
  //         name={line}
  //         onClick={handleNavClick}
  //         className={activeGroup === trainGroup ? 'active' : ''}
  //       >
  //         {trainGroupStr}
  //       </button>
  //     </Link>

    





  const handleClick = () => {
   console.log(specLine)

     

  }
  return (
    <button 
      name={line}
      >{line}</button>
   
  )
};

export default LineButtonComponent;
