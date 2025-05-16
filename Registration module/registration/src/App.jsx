// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'


// function App() {
 

//   return (
//     <>
//       <h1 className='bg-green-500 text-black' >Tailwind css</h1>
//     </>
//   )
// }

// export default App





// import React from "react";
// import Hero from "./components/Hero";
// import Services from "./components/Services/Services1";
// import Banner from "./components/Banner/Banner1";
// import Subscribe from "./components/Subscribe/Subscribe1";
// import Banner2 from "./components/Banner/Banner22";
// import Footer from "./components/Footer/Footer1";

// const App = () => {
//   return (
//     <main >
//       <Hero />
//       <Services />
//       <Banner />
//       <Subscribe />
//       <Banner2 />
//       <Footer />
//     </main>
//   );
// };

// export default App;




import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import Home1 from './pages/Home1.jsx';
import Signup from './Signup.jsx';
import Loginn from './Login2.jsx';
import ForgotPassword from './Forgotpassword.jsx';
import ResetPassword from './Resetpassword.jsx';
import CheckEmailpage from './CheckMail.jsx'
import PasswordSuccess from './PasswordSuccess';

import Dashboard from './pages/Dashbord.jsx';


const App = () => {
  return (
    <Router>
       
      <Routes>
        {/* Define routes for Signup and Login */}

        <Route path="/Signup" element={<Signup />} />
        {/* <Route path="/homepage" element={<Homepage />} /> */}
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/CheckEmail" element={<CheckEmailpage />} />
        <Route path="/ResetPassword/:uidb64/:token" element={<ResetPassword />} />
        <Route path="/PasswordSuccess" element={<PasswordSuccess />} />

        <Route path="/login2" element={<Loginn/>} />


        
        <Route path="/" element={<Home1 />} />
        
        
      </Routes>
    </Router>
    



 );

   };
    
   export default App;
    