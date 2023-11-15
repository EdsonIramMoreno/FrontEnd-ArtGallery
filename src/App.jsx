import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';


const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/ControlPanel" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App
