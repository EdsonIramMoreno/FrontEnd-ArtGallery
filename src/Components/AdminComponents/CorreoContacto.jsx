import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

function CorreoContacto() {
  const [correo, setCorreo] = useState('');


  const handleEditCorreoContacto = () => {
    if (correo && isEmailValid(correo)) {
      console.log(correo);
      // TODO: Send the information to the API

      swal('Edited!', 'The email was edited successfully.', 'success');
    } else {
      swal('Oops!', 'Error, please enter a valid email.', 'error');
    }
  };

  const isEmailValid = (emailVal) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailVal);
  };

  const handleCorreoChange = (event) => {
    setCorreo(event.target.value);
  };

  return (
    <div className='Body3'>
      <div className="Contenido">
        <div className='EditNombre'>
          <h2>Correo Contacto</h2>
          <input
            type="text"
            value={correo}
            onChange={handleCorreoChange}
          />
        </div>
      </div>

      <div className="EditCorreo">
        <button onClick={handleEditCorreoContacto}>Edit Email</button>
      </div>
    </div>
  );
}

export default CorreoContacto;
