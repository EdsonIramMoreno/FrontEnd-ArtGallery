import React, { useEffect, useState } from 'react';
import SiluetasImg from '../assets/img/Contacto.png';
import '../assets/CSS/NavbarStyle.css';
import '../assets/CSS/Contacto.css';
import swal from 'sweetalert';
import emailjs from '@emailjs/browser';

function Contacto() {
  const [visible, setVisible] = useState(false);
  const [about, setAbout] = useState([]);
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false); // Add this line

  const handleCorreoChange = (event) => {
    setCorreo(event.target.value);
  };

  const handleMensajeChange = (event) => {
    setMensaje(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceId = "service_sh2xz2n"; // Replace with your service ID
    const templateId = "template_rah2gyd"; // Replace with your template ID
    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, {
        to_name: about.email,
        from_name: correo,
        message: mensaje
      });
      swal('Correo Enviado!', 'El correo fue enviado correctamente.', 'success');
      setCorreo("");
      setMensaje("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    emailjs.init("hJfUlHRqXtLJAi3gv");

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

  return (
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
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="correo"
                    placeholder="CORREO"
                    value={correo}
                    onChange={handleCorreoChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="mensaje"
                    placeholder="MENSAJE"
                    value={mensaje}
                    onChange={handleMensajeChange}
                  />
                </div>
                <div>
                  <input type="submit" value="ENVIAR" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
