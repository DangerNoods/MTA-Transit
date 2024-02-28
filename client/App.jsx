import React from 'react';
import MainContainer from './container/MainContainer.jsx';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
         <Route path='/' element={<MainContainer/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
