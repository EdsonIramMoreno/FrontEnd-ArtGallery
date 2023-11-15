import React, { useState } from 'react';
import '../../assets/CSS/AdminStyle.css';
import AgregarArte from '../../assets/img/AgregarArte.jpg';
import swal from 'sweetalert';

function AddRedSocial() {
  const [redSocialIcon, setRedSocialIcon] = useState(null);
  const [redSocialName, setRedSocialName] = useState('');
  const [redSocialURL, setRedSocialURL] = useState('');

  const handleRedSocialIconChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
      const fileExtension = selectedImage.name.split('.').pop().toLowerCase();

      if (allowedExtensions.includes(fileExtension)) {
        const newImage = URL.createObjectURL(selectedImage);
        setRedSocialIcon(newImage);
      } else {
        swal('Oops!', 'Error en la extensión del archivo', 'error');
        setRedSocialIcon(null);
      }
    }
  };


  const isURLValid = (url) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };

  const handleGuardarClick = () => {
    if (redSocialName && redSocialURL && redSocialIcon && isURLValid(redSocialURL)) {
      console.log(redSocialIcon);
      console.log(redSocialName);
      console.log(redSocialURL);
      // TODO: Aquí se mandaría la info a la API

      swal('Agregado!', 'La red social fue agregada correctamente.', 'success');
      // Se resetean los valores para poder agregar más obras
      setRedSocialIcon(null);
      setRedSocialName('');
      setRedSocialURL('');
    } else {
      swal('Oops!', 'Error favor de llenar todos los campos o ingresar una URL válida.', 'error');
    }
  };

  return (
    <div className="EditArtworkiaLeft">
      <h2>Red Social</h2>
      <div className="Imagenes-card">
        <div className="GaleriaAdm">

          <input
            type="file"
            id="redSocialIconInput"
            accept="image/*"
            onChange={handleRedSocialIconChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="redSocialIconInput" className="file-input-label">
            <img
              src={redSocialIcon || AgregarArte}
              alt="RedSocial"
              className="arte-image"
            />
          </label>


          <div className="ArtworkDetails">
            <label htmlFor="redSocialName">Nombre de la Red Social:</label>
            <input
              type="text"
              id="redSocialName"
              value={redSocialName}
              onChange={(e) => setRedSocialName(e.target.value)}
            />

            <label htmlFor="redSocialURL">URL de la Red Social:</label>
            <input
              type="text"
              id="redSocialURL"
              value={redSocialURL}
              onChange={(e) => setRedSocialURL(e.target.value)}
            />

            <button onClick={handleGuardarClick}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRedSocial;
