import React, { useEffect, useState } from 'react';
import '../../assets/CSS/AdminStyle.css';
import AgregarArte from '../../assets/img/AgregarArte.jpg';
import swal from 'sweetalert';
import { API_ENDPOINTS_MEDIA } from '../../Api';

function MediaAdmin() {
  const [mediaName, setMediaName] = useState('');
  const [url, setURL] = useState('');
  const [mode, setMode] = useState('Agregar');
  const [isFieldDisabled, setisFieldDisabled] = useState(false);

  const [media, setMedia] = useState([]);
  const [mediaUpdate, setMediaUpdate] = useState([]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  const isYouTubeURL = (url) => {
    const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
    return youtubeRegex.test(url);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request
        const response = await fetch('http://localhost:3001/api/media/getAllMedia');

        // Check if the request was successful (status code 200)
        if (response.ok) {
          // Parse the response JSON
          const result = await response.json();

          // Update the state with the fetched data
          setMedia(result.data);


        } else {
          console.error('Failed to fetch data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error during data fetching:', error);
        setMedia([]);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [mediaUpdate, media]);

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

  const loadInfo = async (selectedValue) => {
    if (selectedValue !== '0') {
      const selectedMedia = media.find(m => m._id === selectedValue);
      if (selectedMedia) {
        setMediaUpdate(selectedMedia);
        setMediaName(selectedMedia.title);
        setURL(selectedMedia.url);
        setisFieldDisabled(false);
      }
    }
  };

  const handleGuardarClick = async () => {
    if (mediaName && url && isYouTubeURL(url)) {
      console.log(mediaName);
      console.log(url);
      const userData = JSON.parse(localStorage.getItem('userData'));
      // TODO: Aquí se mandaría la info a la API
      try {

        const data = {
          title: mediaName,
          url: url,
          id_user_creation: userData._id,
          creation_date: formattedDate,
          id_user_update: userData._id,
          update_date: formattedDate
        };


        const response = await fetch("http://localhost:3001/api/media/createMedia", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.status === 200) {
          swal('Success!', 'Inicio de sesión exitoso', 'success');
          const responseData = await response.json();

          swal('Agregado!', 'El video fue agregado correctamente.', 'success');
      // Se resetean los valores para poder agregar más videos
      setURL('');
      setMediaName('');

        } else if (response.status === 401) {
          console.error('Authentication failed');
          swal('Oops!', 'Usuario o clave equivocados', 'error');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        swal('Oops!', 'Error', 'error');
      }

      
    } else {
      swal('Oops!', 'Error favor de llenar todos los campos o ingresar una URL válida de YouTube.', 'error');
    }
  };

  const handleEditarClick = async () => {
    if (mediaName && url && isYouTubeURL(url)) {

  
      const userData = JSON.parse(localStorage.getItem('userData'));
      // TODO: Aquí se mandaría la info a la API
      try {
        const data = {
          title: mediaName,
          url: url,
          id_user_creation: userData._id,
          creation_date: formattedDate,
          id_user_update: userData._id,
          update_date: formattedDate
        };
  
        const response = await fetch(`http://localhost:3001/api/media/updateMedia/${mediaUpdate._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.status === 200) {
          swal('Success!', 'Inicio de sesión exitoso', 'success');
          const responseData = await response.json();
  
          swal('Editado!', 'El video fue editado correctamente.', 'success');
          // Se resetean los valores para poder agregar más videos
          setURL('');
          setMediaName('');
          setMode('Agregar');
  
          try {
            // Make a GET request
            const response = await fetch('http://localhost:3001/api/media/getAllMedia');
  
            // Check if the request was successful (status code 200)
            if (response.ok) {
              // Parse the response JSON
              const result = await response.json();
  
              // Update the state with the fetched data
              setMedia(result.data);
            } else {
              console.error('Failed to fetch data:', response.status, response.statusText);
            }
          } catch (error) {
            console.error('Error during data fetching:', error);
            setMedia([]);
          }
        } else {
          console.error('Failed to update media:', response.status, response.statusText);
          swal('Oops!', 'Error al editar el video', 'error');
        }
      } catch (error) {
        console.error('Error during media update:', error);
        swal('Oops!', 'Error al editar el video', 'error');
      }
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
    }).then(async (willDelete) => {
      if (willDelete) {
        // TODO: Agrega aquí la lógica para la eliminación del video

        const userData = JSON.parse(localStorage.getItem('userData'));
        try {

          const data = {
            title: mediaName,
            url: url,
            id_user_creation: userData._id,
            creation_date: formattedDate,
            id_user_update: userData._id,
            update_date: formattedDate
          };

          const response = await fetch(`http://localhost:3001/api/media/deleteMedia/${mediaUpdate._id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (response.status === 200) {
            const responseData = await response.json();

            swal('Poof! El video ha sido eliminado.', {
              icon: 'success',
            });
            setURL('');
            setMediaName('');
            setMode("Agregar");

            try {
              // Make a GET request
              const response = await fetch(API_ENDPOINTS_MEDIA.getMedia);

              // Check if the request was successful (status code 200)
              if (response.ok) {
                // Parse the response JSON
                const result = await response.json();

                // Update the state with the fetched data
                setMedia(result.data);
              } else {
                console.error('Failed to fetch data:', response.status, response.statusText);
              }
            } catch (error) {
              console.error('Error during data fetching:', error);
              setPosts([]);
            }

          }
        } catch (error) {
          console.error('Authentication error:', error);
          swal('Oops!', 'Error en la autenticación', 'error');
        }
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
              {media
                  .filter(m => m.isActive)
                  .map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.title}
                    </option>
                  ))}
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
