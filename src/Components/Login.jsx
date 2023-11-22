import React, { useEffect, useState } from 'react';
import NavBar from './Navbar';
import Footer from './Footer';
import '../assets/CSS/Login.css';
import MosaicoImage from '../assets/img/Mosaico.png';
import swal from 'sweetalert';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const isEmailValid = (emailVal) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailVal);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isEmailValid(email)) {
      swal('Oops!', 'Por favor, ingrese un correo electrónico válido.', 'error');
      return;
    }

    if (!password) {
      swal('Oops!', 'Por favor, ingrese una contraseña.', 'error');
      return;
    }

    try {

      const data = {
        email: email,
        password: password,
      };

      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        swal('Success!', 'Inicio de sesión exitoso', 'success');
        // Handle successful login here, e.g., redirect to another page

        const responseData = await response.json();
        localStorage.setItem('userData', JSON.stringify(responseData));

        window.location.href = '/Administracion';
        navigate('/Administracion');

        const storedUserData = JSON.parse(localStorage.getItem('userData'));


      } else if (response.status === 401) {
        console.error('Authentication failed');
        swal('Oops!', 'Usuario o clave equivocados', 'error');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      swal('Oops!', 'Error en la autenticación', 'error');
    }
  };

  return (
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
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
  );
}

export default Login;