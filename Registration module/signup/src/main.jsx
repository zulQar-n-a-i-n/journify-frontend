import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.css'


import Signup from './Signup.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   
   <Signup/>
  </StrictMode>,
)
