import React, { useEffect, useState } from 'react';
import NavBar from './Navbar';
import Footer from './Footer';
import '../assets/CSS/Login.css';
import MosaicoImage from '../assets/img/Mosaico.png';
import swal from 'sweetalert';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const data = {
        "username": username,
        "password": password
      };

      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(data),
      });
      // Handle successful login here, e.g., store the token and redirect
      // For now, just logging the token
      console.log('Token:', response.status);

      if (response.status === 200) {
        // Handle successful login here
        const token = await response.text();
        console.log('Token:', token);
        // Redirect or store the token as needed

        // For demonstration purposes, show a success message
        swal('Success!', 'Login successful', 'success');
      } else if (response.status === 401) {
        // Handle unauthorized (authentication failed) here
        console.error('Authentication failed');
        swal('Oops!', 'Usuario o clave equivocados', 'error');
      }

    } catch (error) {
      // Handle authentication error here, e.g., show an error message to the user
      console.error('Authentication error:', error);
      swal("Oops!", "Clave equivocada", "error");
    }
  };

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
              <h2>INICIAR SESION</h2>
            </div>
            <div className="Inicio Margin-Pg">
              <div className="Mosaico">
                <img src={MosaicoImage} alt="Mosaico" />
              </div>
              <div className="Login">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={handleSubmit}>
                  <div className="INPUTS">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                      type="password"
                      name=""
                      id=""
                      placeholder="Clave"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <input type="submit" value="Iniciar" />
                </form>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
}

export default Login;