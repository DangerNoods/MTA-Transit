import React from 'react';
import MainContainer from './container/MainContainer.jsx';
import TrainGroupContainer from './container/TrainGroupContainer.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccessibilityContainer from './container/AccessibilityContainer.jsx';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainContainer />} />
          <Route path="/:currTrainGroup" element={<TrainGroupContainer />} />
          <Route path="/abc" element={<AccessibilityContainer />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
