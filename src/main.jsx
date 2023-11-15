import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './Components/Login'
import NavBar from './Components/Navbar.jsx'
import Home from './Components/Home.jsx';
import './index.css'
import './assets/CSS/NavbarStyle.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>,
)