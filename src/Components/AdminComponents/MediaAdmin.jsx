import React, { useState } from 'react';
import '../../assets/CSS/AdminStyle.css';
import AgregarArte from '../../assets/img/AgregarArte.jpg';
import swal from 'sweetalert';

function MediaAdmin() {
  const [mediaName, setMediaName] = useState('');
  const [url, setURL] = useState('');
  const [mode, setMode] = useState('Agregar');
  const [isFieldDisabled, setisFieldDisabled] = useState(false);

  const isYouTubeURL = (url) => {
    const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
    return youtubeRegex.test(url);
  };

  const handleMode = (mode) => {
    setMode(mode);

    setURL('');
    setMediaName('');

    if (mode === 'Modificar') {
      setisFieldDisabled(true);
    } else {
      setisFieldDisabled(false);
    }
  };

  const loadInfo = (id) => {
    if (id != '0') {
      setURL(id);
      setisFieldDisabled(false);
    }
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

  const handleEditarClick = () => {
    if (mediaName && url && isYouTubeURL(url)) {
      console.log(mediaName);
      console.log(url);
      // TODO: Aquí se mandaría la info a la API

      swal('Editado!', 'El video fue editado correctamente.', 'success');
      // Se resetean los valores para poder agregar más videos
      setURL('');
      setMediaName('');
      setMode("Agregar");
    } else {
      swal('Oops!', 'Error favor de llenar todos los campos o ingresar una URL válida de YouTube.', 'error');
    }
  };

  const handleEliminarClick = () => {
    swal({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este video.',
      icon: 'warning',
      buttons: ['Cancelar', 'Eliminar'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // TODO: Agrega aquí la lógica para la eliminación del video
        swal('Poof! El video ha sido eliminado.', {
          icon: 'success',
        });
        setURL('');
        setMediaName('');
        setMode("Agregar");
      } else {
        swal('El video está a salvo.');
      }
    });
  };

  return (
    <div className='AdminInfo-card'>
      <div className="AddMediaContainer">
        <div className="Radios">
          <label>
            <input
              type="radio"
              value="Agregar"
              checked={mode === 'Agregar'}
              onChange={() => handleMode('Agregar')}
            />
            <span>Agregar</span>
          </label>
          <label>
            <input
              type="radio"
              value="Modificar"
              checked={mode === 'Modificar'}
              onChange={() => handleMode('Modificar')}
            />
            <span>Modificar</span>
          </label>
        </div>

        {mode === 'Agregar' ? (
          <>
            <div className='ArtworkDetails'>
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
              </div>

            </div>
            <button className="BotonAddArtwork" onClick={handleGuardarClick}>Guardar</button>
          </>
        ) : (
          <>
            <label htmlFor="selectRedSocial">Seleccionar video:</label>
            <select
              id="selectRedSocial"
              className="Media-Select Centered"
              onChange={(e) => loadInfo(e.target.value)}>
              <option value="0">Selecciona un video</option>
              <option value="video1">Video 1</option>
              <option value="video2">Video 2</option>
              <option value="video3">Video 3</option>
              <option value="video4">Video 4</option>
            </select>

            <div className='ArtworkDetails'>
              <div className="MediaDetails">
                <label htmlFor="mediaName">Nombre del video:</label>
                <input
                  type="text"
                  id="mediaNameEdit"
                  value={mediaName}
                  onChange={(e) => setMediaName(e.target.value)}
                  disabled={isFieldDisabled}
                />

                <label htmlFor="mediaURL">URL del video (YouTube):</label>
                <input
                  type="text"
                  id="mediaURLEdit"
                  value={url}
                  onChange={(e) => setURL(e.target.value)}
                  disabled={isFieldDisabled}
                />
              </div>
            </div>
            <button className="BotonAddArtwork" onClick={handleEditarClick} disabled={isFieldDisabled}>Editar</button>
            <button className="BotonAddArtwork" onClick={handleEliminarClick} disabled={isFieldDisabled}>Eliminar</button>
          </>
        )}

      </div>
    </div>
  );
}

export default MediaAdmin;
