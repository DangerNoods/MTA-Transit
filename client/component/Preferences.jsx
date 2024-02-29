import React from 'react';
import TrainGroupContainer from '../container/TrainGroupContainer.jsx';

const Checkbox = () => {

  const [checked, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <div>
    <input type='checkbox'  checked={checked} onChange={handleChange}/>
    </div>
  );

}

const Preferences = (props) => {

  const checks = []

  for(let i = 0; i < 8; i ++){
    checks.push(<Checkbox/>)
  }

  return(
    <div>
      <h3>Preferences</h3>
      <div>
      {checks}
    </div>
    </div>
  );
};

export default Preferences;
