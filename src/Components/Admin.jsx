import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import AdminInfo from './AdmInfo';

// import './assets/NavbarStyle.css'

function Admin() {
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
        <React.StrictMode>
            <div className={`mi-componente ${visible ? 'visible' : ''}`}>
                <div className='Body2'>
                    {/* <NavBar /> */}
                    <div className="Contenido">
                        <div className='Pag-name'>
                            <h2>ADMINISTRADOR</h2>
                        </div>
                        <AdminInfo />
                        <Footer />
                    </div>
                </div>
            </div>
        </React.StrictMode>
    );
}

export default Admin;