import React, { useRef } from 'react';


function NavAdmin() {
  return (
    <Router>
      <nav className="ClassNavBar">
        <ul className="menu">
          <li><Link to="/AcercaDe">ACERCA DE</Link></li>
          <li><Link to="/Artwork">ARTWORK</Link></li>
          <li><Link to="/Media">MEDIA</Link></li>
          <li><Link to="/Contacto">CONTACTO</Link></li>
          {/* Eliminar despues */}
        </ul>
      </nav>

      <Routes>
        <Route path="/AcercaDe" element={<AcercaDe />}></Route>
        <Route path="/Artwork" element={<Artwork />}></Route>
        <Route path="/Media" element={<Media />}></Route>
        <Route path="/Contacto" element={<Contacto />}></Route>
      </Routes>
    </Router>
  );
}

export default NavAdmin;