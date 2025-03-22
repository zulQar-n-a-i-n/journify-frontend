import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import './index.css';

import Signup from './Signup.jsx';
import Loginn from './Login2.jsx';
import Homepage from './homepage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> {/* Wrap your app with BrowserRouter */}
      <Routes>
        {/* Define routes for Signup and Login */}
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login2" element={<Loginn/>} />
        <Route path="/homepage" element={<Homepage />} />
        {/* Default route (redirects to Signup) */}
        <Route path="/" element={<Signup />} />
      </Routes>
    </Router>
  </StrictMode>
);
