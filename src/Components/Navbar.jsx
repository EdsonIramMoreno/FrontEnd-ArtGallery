import React, { useEffect, useState } from 'react';
import Home from './Home';
import Login from './Login';
import AcercaDe from './AcercaDe';
import Artwork from './Artwork';
import Media from './Media';
import Contacto from './Contacto';
import Admin from './AdminComponents/Admin';
import Details from './ObraDetails'

import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes
} from 'react-router-dom'

import '../assets/CSS/NavbarStyle.css'

function NavBar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }

    
  }, []);


  const handleLogout = () => {
    sessionStorage.removeItem('userData');

    // Remove the item from localStorage
    localStorage.removeItem('userData');

    const userData = localStorage.getItem('userData');

    setIsAdmin(false);
    window.location.href = '/AcercaDe';
  };

  return (
    <Router>
      
      <nav className="ClassNavBar">
        <li className='NombreNav'><Link to="/Artwork">Espacio Caordico</Link></li>
        <ul className="menu">
          <li><Link to="/AcercaDe">ACERCA DE</Link></li>
          <li><Link to="/Artwork">ARTWORK</Link></li>
          <li><Link to="/Media">MEDIA</Link></li>
          <li><Link to="/Contacto">CONTACTO</Link></li>
          {isAdmin && (
          <>
            <li><Link to="/Administracion">ADMIN</Link></li>
            <li onClick={handleLogout}>LOG-OUT</li>
          </>
        )}

        </ul>
      </nav>

      <Routes>
        <Route path="/LogAdmin" element={<Login />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/AcercaDe" element={<AcercaDe />}></Route>
        <Route path="/Artwork" element={<Artwork />}></Route>
        <Route path="/Media" element={<Media />}></Route>
        <Route path="/Contacto" element={<Contacto />}></Route>


        <Route path="/details/:id" element={<Details />} />

        {/* Eliminar despues */}
        <Route path="/Administracion" element={<Admin />}></Route>
      </Routes>
    </Router>
  );
}

export default NavBar;
