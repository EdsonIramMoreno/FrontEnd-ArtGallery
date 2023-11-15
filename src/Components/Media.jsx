import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
// import NavBar from './Navbar';
import Footer from './Footer';
import MediaComp from './MediaComp';
import '../assets/CSS//NavbarStyle.css'
import '../assets/CSS/Media.css'

function Media() {
    const [visible, setVisible] = useState(false);

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
                {/* <NavBar /> */}
                <div className="Contenido">
                    <div className='Pag-name'>
                        <h2>MEDIA</h2>
                    </div>

                    <div className='Margin-Pg'>
                        <MediaComp />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Media;
