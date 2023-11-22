import React, { useEffect, useState } from 'react';
import '../assets/CSS/NavbarStyle.css'
import '../assets/CSS/AcercaDe.css'
import SocialMediaList from './SocialMediaList.jsx';
import ArtistaImg from '../assets/img/ArtistaEjemplo.jpg'


function AcercaDe() {
    const [visible, setVisible] = useState(false);
    const [about, setAbout] = useState([]);

    const storedUserData = JSON.parse(localStorage.getItem('userData'))

    useEffect(() => {

    const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/about/getAbout/1`);
  

          if (response.ok) {
            const result = await response.json();
         
              setAbout(result);
            
          } else {
            console.error('Failed to fetch data:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Error during data fetching:', error);
          setAbout([]);
        }
      };
  
      // Call the fetchData function when the component mounts
      fetchData();

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
                {/* <NavBar /> */}
                <div className="Contenido">
                    <div className='Pag-name'>
                        <h2>ACERCA DE</h2>
                    </div>
                    <div className="Info">
                        <div className="FotoArtista">
                            <img src={ArtistaImg} alt="Artista" />
                        </div>
                        <div className="InfoArtista">
                            <h2>{about.artist_name}</h2>
                            <p>{about.resume}
                                </p>
                        </div>
                    </div>
                    <SocialMediaList />
                </div>

            </div>
        </div>
    )
}

export default AcercaDe;