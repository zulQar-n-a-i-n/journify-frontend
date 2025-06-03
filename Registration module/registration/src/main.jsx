import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import './index.css';

// import Signup from './Signup.jsx';
// import Loginn from './Login2.jsx';
// import Homepage from './homepage.jsx';
// import ForgotPassword from './Forgotpassword.jsx';
// import ResetPassword from './Resetpassword.jsx';
// import CheckEmailpage from './CheckMail.jsx'
// import PasswordSuccess from './PasswordSuccess';

import App from './App.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
    
  
    
    
    
    {/* <Router>
       
      <Routes> */}
        {/* Define routes for Signup and Login */}

        {/* <Route path="/Signup" element={<Signup />} />
        <Route path="/login2" element={<Loginn/>} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/CheckEmail" element={<CheckEmailpage />} />

        <Route path="/ResetPassword/:token" element={<ResetPassword />} />
        <Route path="/PasswordSuccess" element={<PasswordSuccess />} /> */}

        {/* Default route (redirects to Signup) */}

        {/* <Route path="/" element={<App />} /> */}

        
        
      {/* </Routes>
    </Router> */}
  </StrictMode>
);
