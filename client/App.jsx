import React from 'react';
import MainContainer from './container/MainContainer.jsx';
import TrainGroupContainer from './container/TrainGroupContainer.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainContainer />} />
          <Route path="/:currTrainGroup" element={<TrainGroupContainer />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
