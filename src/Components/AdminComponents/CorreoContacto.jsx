import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

function CorreoContacto() {
  const [correo, setCorreo] = useState('');


  const handleEditCorreoContacto = async () => {
    if (correo && isEmailValid(correo)) {
      console.log(correo);

      const storedUserData = JSON.parse(localStorage.getItem('userData'));
      console.log(storedUserData.userId);

      // TODO: Send the information to the API
      // aquí tambien sale bad request no entiendooooo

      try{

        const data = {
          email: correo
        }

        const response = await fetch(`http://localhost:3001/api/users/updateEmail/${userId}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if(response.status === 200){
          swal('Edited!', 'The email was edited successfully.', 'success');
        }
      }
      catch(error){
        console.log(error)
      }

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
      <div className="AdminInfo-card">
          <div className='EditNombreC'>
            <label htmlFor="">Ingrese un correo</label>
            <input
              type="text"
              value={correo}
              onChange={handleCorreoChange}
            />
            <button className="BotonAddArtwork a" onClick={handleEditCorreoContacto}>Editar correo</button>

          </div>

      </div>

    </div>
  );
}

export default CorreoContacto;
