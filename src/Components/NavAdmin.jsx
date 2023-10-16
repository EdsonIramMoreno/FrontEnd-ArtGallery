import React, { useRef } from 'react';


function NavAdmin() {
  const [zapatosRef, setZapatosRef] = useState(null);

  const handleScrollToZapatos = () => {
    if (zapatosRef && zapatosRef.current) {
      window.scrollTo({
        top: zapatosRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='NavegacionAdmin'>
      <a href="#" onClick={handleScrollToZapatos}>Zapatos</a>
    </div>
  );
}

// Agregar un método para establecer la referencia desde AdminInfo
NavAdmin.setZapatosRef = (ref) => {
  setZapatosRef(ref);
};

export default NavAdmin;