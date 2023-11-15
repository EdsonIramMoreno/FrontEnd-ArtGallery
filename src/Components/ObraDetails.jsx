import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/CSS/ObraDetails.css'

function Details() {
  const [visible, setVisible] = useState(false);

  const { id, name, image } = useParams();
  console.log(id, name, image);



  useEffect(() => {
    // Simula una demora antes de mostrar el componente
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 100); // Cambia esto al tiempo de carga deseado

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={`mi-componente ${visible ? 'visible' : ''}`}>
      <div className='Body2'>
        <div className="Contenido">
          <div className='Pag-name'>
            <h2>{name}</h2>
          </div>

          <div className='Card-Info'>

            <div className="Image-Artwork">
              <img src={image} alt={name} />
            </div>

            <div className='Card-Descript'>
              <p>Parrafo Descriptivo de la obra</p>
            </div>

          </div>

        </div>
      </div>
    </div>

  );
}

export default Details;
