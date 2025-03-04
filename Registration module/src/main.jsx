import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.css'

import Loginn from "./Login2.jsx"
import Signup from './Signup.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
   
   <Loginn/>
   
   <Signup/>
  </StrictMode>,
)
