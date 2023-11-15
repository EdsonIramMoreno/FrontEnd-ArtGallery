import React from 'react';
import Pinturas from '../assets/img/Pinturas.jpg'
import Esculturas from '../assets/img/Esculturas.jpg'
import Mosaico from '../assets/img/Mosaico.png'
import Contacto from '../assets/img/Contacto.png'
import Patron from '../assets/img/Patron.png'

import ObraComponent from '../Components/Obra.jsx'

function ArtworkGrid() {
  return (
    <div className="Galeria">

      <ObraComponent
        name="Ejemplo 1"
        image={Pinturas}
        id='1' />

      <ObraComponent
        name="Ejemplo 2"
        image={Esculturas}
        id='2' />

      <ObraComponent
        name="Ejemplo 3"
        image={Mosaico}
        id='3' />

      <ObraComponent
        name="Ejemplo 4"
        image={Contacto}
        id='4' />

      <ObraComponent
        name="Ejemplo 5"
        image={Patron}
        id='5' />

      <ObraComponent
        name="Ejemplo 6"
        image={Pinturas}
        id='6' />


    </div>

  );
}

export default ArtworkGrid;
