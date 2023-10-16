import React from 'react';
import Pinturas from '../assets/img/Pinturas.jpg'
import Esculturas from '../assets/img/Esculturas.jpg'
import Mosaico from '../assets/img/Mosaico.png'
import Contacto from '../assets/img/Contacto.png'

function ArtworkGrid() {
  return (
            <div className="Galeria">

                <img src={Pinturas} alt="Grid" />
                <img src={Esculturas} alt="Grid" />
                <img src={Mosaico} alt="Grid" />
                <img src={Contacto} alt="Grid" />
                <img src={Pinturas} alt="Grid" />
                <img src={Esculturas} alt="Grid" />
                <img src={Mosaico} alt="Grid" />
                <img src={Contacto} alt="Grid" />
                <img src={Pinturas} alt="Grid" />
                <img src={Pinturas} alt="Grid" />
                <img src={Esculturas} alt="Grid" />
                <img src={Mosaico} alt="Grid" />
                <img src={Contacto} alt="Grid" />
                <img src={Pinturas} alt="Grid" />
                <img src={Esculturas} alt="Grid" />
                <img src={Mosaico} alt="Grid" />
                <img src={Contacto} alt="Grid" />
                <img src={Pinturas} alt="Grid" />
            </div>

  );
}

export default ArtworkGrid;
