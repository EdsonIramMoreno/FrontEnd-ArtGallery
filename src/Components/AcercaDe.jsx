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


        // no me sale nada ni en la consola efe
        const fetchAboutData = async () => {
            try{
                const response = await fetch(`http://localhost:3001/api/about/getAbout/${storedUserData.userId}`, {
                    method:'GET',
                    headers: {
                        'Content-Type': 'application/json',
                      }
                });

                if(response.ok){
                    const result = await response.json();
                    const aboutData = result.data[0];
                    setAbout(aboutData);
                    console.log(aboutData);
                }
            }
            catch(error){
                console.log(error);
            }
        }

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