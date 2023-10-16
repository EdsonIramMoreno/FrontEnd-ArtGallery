import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './Navbar';
import Footer from './Footer';
import SiluetasImg from '../assets/img/Contacto.png'
import '../assets/CSS/NavbarStyle.css'
import '../assets/CSS/Contacto.css'

function Contacto() {
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
                        <h2>CONTACTO</h2>
                    </div>

                        <div className="ContactoClass Margin-Pg">
                            <div className="Siluetas">
                                <img src={SiluetasImg} alt="Imagen" />
                            </div>

                            <div className="Contactar">
                                <form action="">
                                    <input type="text" name="" id="" placeholder="CORREO" />
                                    <input type="text" name="" id="" placeholder="MENSAJE" />
                                    <input type="submit" value="ENVIAR" />
                                </form>
                            </div>
                        </div>

                        <Footer />
                    </div>
                </div>
            </div>
        </React.StrictMode>
    )
}

export default Contacto;
