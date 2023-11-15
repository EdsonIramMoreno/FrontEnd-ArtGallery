import React, { useState } from 'react';
import '../../assets/CSS/AdminStyle.css';
import AgregarArte from '../../assets/img/AgregarArte.jpg';
import swal from 'sweetalert';

function AddArtWork() {
  const [artworkImage, setArtworkImage] = useState(null);
  const [artworkName, setArtworkName] = useState('');
  const [artworkDescription, setArtworkDescription] = useState('');

  const handleArtworkImageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
      const fileExtension = selectedImage.name.split('.').pop().toLowerCase();

      if (allowedExtensions.includes(fileExtension)) {
        const newImage = URL.createObjectURL(selectedImage);
        setArtworkImage(newImage);
      } else {
        swal('Oops!', 'Error en la extensión del archivo', 'error');
        setArtworkImage(null);
      }
    }
  };

  const handleGuardarClick = () => {
    if (artworkName && artworkDescription && artworkImage) {
      console.log('Guardar clicked');
      console.log('Artwork Name:', artworkName);
      console.log('Artwork Description:', artworkDescription);
      // TODO: Aquí se mandaría la info a la API


      swal('Agregado!', 'La obra fue agregada correctamente.', 'success');
      // Se resetean los valores para poder agregar más obras
      setArtworkImage(null);
      setArtworkName('');
      setArtworkDescription('');
    } else {
      swal('Oops!', 'Error favor de llenar todos los campos.', 'error');
    }
  };

  return (
    <div className="EditArtworkiaLeft">
      <h2>Artwork</h2>
      <div className="Imagenes-card">
        <div className="GaleriaAdm">
          <input
            type="file"
            id="artworkImageInput"
            accept="image/*"
            onChange={handleArtworkImageChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="artworkImageInput" className="file-input-label">
            <img
              src={artworkImage || AgregarArte}
              alt="Arte"
              className="arte-image"
            />
          </label>

        </div>
      </div>

      <div className="ArtworkDetails">
        <label htmlFor="artworkName">Nombre de la Obra:</label>
        <input
          type="text"
          id="artworkName"
          value={artworkName}
          onChange={(e) => setArtworkName(e.target.value)}
        />

        <label>Descripción de la Obra:</label>
        <textarea
          id="artworkDescription"
          value={artworkDescription}
          onChange={(e) => setArtworkDescription(e.target.value)}
          style={{ resize: 'both', overflow: 'auto', minHeight: '100px' }}
        ></textarea>

        <button onClick={handleGuardarClick}>Guardar</button>
      </div>
    </div>
  );
}

export default AddArtWork;
