

<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import Home1 from './pages/Home1.jsx';
=======
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
// // import Home1 from './pages/Home1.jsx';
// import Signup from './Signup.jsx';
// import Loginn from './Login2.jsx';
// import ForgotPassword from './Forgotpassword.jsx';
// import ResetPassword from './Resetpassword.jsx';
// import CheckEmailpage from './CheckMail.jsx'
// import PasswordSuccess from './PasswordSuccess';

// import Dashboard from './pages/Dashbord.jsx';


// const App = () => {
//   return (
//     <Router>
       
//       <Routes>
//         {/* Define routes for Signup and Login */}

//         <Route path="/Signup" element={<Signup />} />
//         {/* <Route path="/homepage" element={<Homepage />} /> */}
//         <Route path="/ForgotPassword" element={<ForgotPassword />} />
//         <Route path="/CheckEmail" element={<CheckEmailpage />} />
//         <Route path="/ResetPassword/:uidb64/:token" element={<ResetPassword />} />
//         <Route path="/PasswordSuccess" element={<PasswordSuccess />} />

//         <Route path="/login2" element={<Loginn/>} />


        
//         <Route path="/" element={< Dashboard   />} />
        
        
//       </Routes>
//     </Router>
    



//  );

//    };
    
//    export default App;








import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
>>>>>>> 7cdd7026c67153ef9f1d786ba3ba5826d91904a7
import Signup from './Signup.jsx';
import Loginn from './Login2.jsx';
import ForgotPassword from './Forgotpassword.jsx';
import ResetPassword from './Resetpassword.jsx';
import CheckEmailpage from './CheckMail.jsx';
import PasswordSuccess from './PasswordSuccess.jsx';
import Dashboard from './pages/Dashbord.jsx';
import Home1 from './pages/Home1.jsx';
import PrivateRoute from './routes/privateRoute.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/CheckEmail" element={<CheckEmailpage />} />
        <Route path="/ResetPassword/:uidb64/:token" element={<ResetPassword />} />
        <Route path="/PasswordSuccess" element={<PasswordSuccess />} />
        <Route path="/login2" element={<Loginn />} />
         <Route path="/" element={< Home1 />} />

<<<<<<< HEAD
        <Route path="/login2" element={<Loginn/>} />


        
        <Route path="/" element={<Dashboard/>} />
        
        
=======
        {/* ✅ Protect Dashboard route */}
        <Route
          path="/Dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
>>>>>>> 7cdd7026c67153ef9f1d786ba3ba5826d91904a7
      </Routes>
    </Router>
  );
};

export default App;

    