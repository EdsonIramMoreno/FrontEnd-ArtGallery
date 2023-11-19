import React, { useEffect, useState } from 'react';
import AdminInfo from '../AdminComponents/AdminInfo';
import ArtWorkAdmin from '../AdminComponents/ArtWorkAdmin';
import MediaAdmin from './MediaAdmin';
import RedSocialAdmin from './RedSocialAdmin';
import CorreoContacto from '../AdminComponents/CorreoContacto';
import '../../assets/CSS/Admin.css';

function Admin() {
  const [visible, setVisible] = useState(false);

  const [menuVisibleAcercaDe, setmenuVisibleAcercaDe] = useState(false);
  const [menuVisibleArtWorkAdmin, setmenuVisibleArtWorkAdmin] = useState(false);
  const [menuVisibleMediaAdmin, setmenuVisibleMediaAdmin] = useState(false);
  const [menuVisibleRedSocial, setmenuVisibleRedSocial] = useState(false);
  const [menuVisibleCorreoContacto, setmenuVisibleCorreoContacto] = useState(false);

  const [currentSection, setCurrentSection] = useState('ADMINISTRADOR');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const MenuToggle = ({ onClick, isVisible, buttonText, sectionName }) => (
    <div className="menu-toggle-container">
      <button className="menu-toggle" onClick={() => handleMenuToggle(onClick, isVisible, sectionName)}>
        {isVisible ? `Cerrar ${buttonText}` : `Abrir ${buttonText}`}
      </button>
    </div>
  );

  const handleMenuToggle = (menuSetter, isVisibleState, sectionName) => {
    // Oculta todos los menús
    setmenuVisibleAcercaDe(false);
    setmenuVisibleArtWorkAdmin(false);
    setmenuVisibleMediaAdmin(false);
    setmenuVisibleRedSocial(false);
    setmenuVisibleCorreoContacto(false);

    // Muestra u oculta el menú correspondiente
    menuSetter(!isVisibleState);

    // Actualiza la sección actual
    setCurrentSection(isVisibleState ? 'ADMINISTRADOR' : sectionName);
  };

  return (
    <div className={`mi-componente ${visible ? 'visible' : ''}`}>
      <div className='Body2'>
        <div className='Pag-name'>
          <h2>{currentSection}</h2>
        </div>
        <div className="ContenidoAdm">
          <div className="buttons-container">
          <hr/>
            <MenuToggle
              onClick={() => handleMenuToggle(setmenuVisibleAcercaDe, menuVisibleAcercaDe, 'Acerca De')}
              isVisible={menuVisibleAcercaDe}
              buttonText="Acerca De"
              sectionName="ADMINISTRADOR - ACERCA DE"
            />
            <hr/>
            <MenuToggle
              onClick={() => handleMenuToggle(setmenuVisibleArtWorkAdmin, menuVisibleArtWorkAdmin, 'ArtWork')}
              isVisible={menuVisibleArtWorkAdmin}
              buttonText="ArtWork"
              sectionName="ADMINISTRADOR - ARTWORK"
            />
            <hr/>          
            <MenuToggle
              onClick={() => handleMenuToggle(setmenuVisibleMediaAdmin, menuVisibleMediaAdmin, 'Media')}
              isVisible={menuVisibleMediaAdmin}
              buttonText="Media"
              sectionName="ADMINISTRADOR - MEDIA"
            />
            <hr/>
            <MenuToggle
              onClick={() => handleMenuToggle(setmenuVisibleRedSocial, menuVisibleRedSocial, 'Redes')}
              isVisible={menuVisibleRedSocial}
              buttonText="Redes"
              sectionName="ADMINISTRADOR - REDES"
            />
            <hr/>
            <MenuToggle
              onClick={() => handleMenuToggle(setmenuVisibleCorreoContacto, menuVisibleCorreoContacto, 'Correo')}
              isVisible={menuVisibleCorreoContacto}
              buttonText="Correo"
              sectionName="ADMINISTRADOR - CORREO"
            />
            <hr/>
          </div>

          {menuVisibleAcercaDe && <AdminInfo />}
          {menuVisibleArtWorkAdmin && <ArtWorkAdmin />}
          {menuVisibleMediaAdmin && <MediaAdmin />}
          {menuVisibleRedSocial && <RedSocialAdmin />}
          {menuVisibleCorreoContacto && <CorreoContacto />}
        </div>
      </div>
    </div>
  );
}

export default Admin;