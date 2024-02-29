import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

//importing components
import MainContainer from './container/MainContainer.jsx';
import TrainGroupContainer from './container/TrainGroupContainer.jsx';
import Preferences from './component/Preferences.jsx';
import Sidebar from './component/Sidebar.jsx';
import AccessibilityContainer from './container/AccessibilityContainer.jsx';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="201959444032-a940k1h8ha9gq25hsc9j0uvf62ooe9fa.apps.googleusercontent.com">
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<MainContainer />} />
          <Route path="/:currTrainGroup" element={<TrainGroupContainer />} />
          <Route path="/abc" element={<AccessibilityContainer />} />
          <Route path="/preferences" element={<Preferences />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
