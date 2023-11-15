import React, { useEffect, useState } from 'react';
import AdminInfo from '../AdminComponents/AdminInfo';
import AddArtWork from '../AdminComponents/AddArtWork';
import AddMedia from '../AdminComponents/AddMedia';
import AddRedSocial from '../AdminComponents/AddRedSocial';
import CorreoContacto from '../AdminComponents/CorreoContacto';
import '../../assets/CSS/Admin.css';

function Admin() {
  const [visible, setVisible] = useState(false);
  const [menuVisibleAcercaDe, setmenuVisibleAcercaDe] = useState(false);
  const [menuVisibleAddArtWork, setmenuVisibleAddArtWork] = useState(false);
  const [menuVisibleAddMedia, setmenuVisibleAddMedia] = useState(false);
  const [menuVisibleRedSocial, setmenuVisibleRedSocial] = useState(false);
  const [menuVisibleCorreoContacto, setmenuVisibleCorreoContacto] = useState(false);

  useEffect(() => {
    // Simulate a delay before showing the component
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const toggleMenuAcercaDe = () => {
    setmenuVisibleAcercaDe(!menuVisibleAcercaDe);
  };

  const toggleMenuAddArtWork = () => {
    setmenuVisibleAddArtWork(!menuVisibleAddArtWork);
  };

  const toggleMenuAddMedia = () => {
    setmenuVisibleAddMedia(!menuVisibleAddMedia);
  };

  const toggleMenuRedSocial = () => {
    setmenuVisibleRedSocial(!menuVisibleRedSocial);
  };

  const toggleMenuCorreoContacto = () => {
    setmenuVisibleCorreoContacto(!menuVisibleCorreoContacto);
  };

  return (
    <div className={`mi-componente ${visible ? 'visible' : ''}`}>
      <div className='Body2'>
        <div className="Contenido">
          <div className='Pag-name'>
            <h2>ADMINISTRADOR</h2>
          </div>
          <button className="menu-toggle" onClick={toggleMenuAcercaDe}>
            {menuVisibleAcercaDe ? 'Collapse Menu Acerca De' : 'Expand Menu Acerca De'}
          </button>
          {menuVisibleAcercaDe && (
            <div className="collapsible-menu">
              <AdminInfo />
            </div>
          )}
          <button className="menu-toggle" onClick={toggleMenuAddArtWork}>
            {menuVisibleAddArtWork ? 'Collapse Menu AddArtWork' : 'Expand Menu AddArtWork'}
          </button>
          {menuVisibleAddArtWork && (
            <div className="collapsible-menu">
              <AddArtWork />
            </div>
          )}
          <button className="menu-toggle" onClick={toggleMenuAddMedia}>
            {menuVisibleAddMedia ? 'Collapse Menu AddMedia' : 'Expand Menu AddMedia'}
          </button>
          {menuVisibleAddMedia && (
            <div className="collapsible-menu">
              <AddMedia />
            </div>
          )}
          <button className="menu-toggle" onClick={toggleMenuRedSocial}>
            {menuVisibleRedSocial ? 'Collapse Menu Red Social' : 'Expand Menu Red Social'}
          </button>
          {menuVisibleRedSocial && (
            <div className="collapsible-menu">
              <AddRedSocial />
            </div>
          )}
          <button className="menu-toggle" onClick={toggleMenuCorreoContacto}>
            {menuVisibleCorreoContacto ? 'Collapse Menu Correo Contacto' : 'Expand Menu Correo Contacto'}
          </button>
          {menuVisibleCorreoContacto && (
            <div className="collapsible-menu">
              <CorreoContacto />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
