import React, { useState } from 'react';
import '../../assets/CSS/AdminStyle.css';
import AgregarArte from '../../assets/img/AgregarArte.jpg';
import swal from 'sweetalert';

function AddMedia() {
  const [mediaName, setMediaName] = useState('');
  const [url, setURL] = useState('');

  const isYouTubeURL = (url) => {
    const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
    return youtubeRegex.test(url);
  };

  const handleGuardarClick = () => {
    if (mediaName && url && isYouTubeURL(url)) {
      console.log(mediaName);
      console.log(url);
      // TODO: Aquí se mandaría la info a la API

      swal('Agregado!', 'El video fue agregado correctamente.', 'success');
      // Se resetean los valores para poder agregar más videos
      setURL('');
      setMediaName('');
    } else {
      swal('Oops!', 'Error favor de llenar todos los campos o ingresar una URL válida de YouTube.', 'error');
    }
  };

  return (
    <div className="AddMediaContainer">
      <h2>Media</h2>

      <div className="MediaDetails">
        <label htmlFor="mediaName">Nombre del video:</label>
        <input
          type="text"
          id="mediaName"
          value={mediaName}
          onChange={(e) => setMediaName(e.target.value)}
        />

        <label htmlFor="mediaURL">URL del video (YouTube):</label>
        <input
          type="text"
          id="mediaURL"
          value={url}
          onChange={(e) => setURL(e.target.value)}
        />

        <button onClick={handleGuardarClick}>Guardar</button>
      </div>
    </div>
  );
}

export default AddMedia;
