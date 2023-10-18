import React, { useEffect, useState } from 'react';
import Home from './Home';
import Login from './Login';
import AcercaDe from './AcercaDe';
import Artwork from './Artwork';
import Media from './Media';
import Contacto from './Contacto';
import Admin from './Admin';

import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes
} from 'react-router-dom'

function NavAdmin() {
  return (
   <Router>
     <nav className="ClassNavBar">
       <ul className="menu">
         <li><Link to="/AcercaDeAd">ACERCA DE</Link></li>
         <li><Link to="/ArtworkAd">ARTWORK</Link></li>
         <li><Link to="/MediaAd">MEDIA</Link></li>
       <li><Link to="/ContactoAd">CONTACTO</Link></li>
       </ul>
     </nav>

     <Routes>
       <Route path="/AcercaDeAd" element={<AcercaDe />}></Route>
       <Route path="/ArtworkAd" element={<Artwork />}></Route>
       <Route path="/MediaAd" element={<Media />}></Route>
       <Route path="/ContactoAd" element={<Contacto />}></Route>
     </Routes>
   </Router>
  );
}

export default NavAdmin;