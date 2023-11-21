import React, { useEffect, useState } from 'react';
import '../../assets/CSS/AdminStyle.css';
import AgregarArte from '../../assets/img/AgregarArte.jpg';
import swal from 'sweetalert';
import { API_ENDPOINTS_SOCIAL_MEDIA } from '../../Api';

function RedSocialAdmin() {
  const [redSocialIcon, setRedSocialIcon] = useState(null);
  const [redSocialName, setRedSocialName] = useState('');
  const [redSocialURL, setRedSocialURL] = useState('');
  const [mode, setMode] = useState('Agregar');
  const [isFieldDisabled, setisFieldDisabled] = useState(false);

  const [media, setMedia] = useState([]);
  const [mediaUpdate, setMediaUpdate] = useState([]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request
        const response = await fetch('http://localhost:3001/api/social/getAllSocial');

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

  const handleRedSocialIconEditChange = (event) => {
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

  const handleMode = (mode) => {
    setMode(mode);

    setRedSocialIcon(null);
    setRedSocialName('');
    setRedSocialURL('');

    if (mode === 'Modificar') {
      setisFieldDisabled(true);
    } else {
      setisFieldDisabled(false);
    }
  };

  const isURLValid = (url) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };

  const handleGuardarClick = async () => {
    if (redSocialName && redSocialURL && redSocialIcon && isURLValid(redSocialURL)) {

      
      const userData = JSON.parse(localStorage.getItem('userData'));
      // TODO: Aquí se mandaría la info a la API
      try {

        const data = {
          name: redSocialName,
    url: redSocialURL,
    icon: "redSocialIcon",
          id_user_creation: userData._id,
          creation_date: formattedDate,
          id_user_update: userData._id,
          update_date: formattedDate
        };


        const response = await fetch('http://localhost:3001/api/social/createSocial', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.status === 200) {
          swal('Success!', 'Inicio de sesión exitoso', 'success');
          const responseData = await response.json();

          swal('Agregado!', 'La red social fue agregada correctamente.', 'success');
      // Se resetean los valores para poder agregar más obras
      setRedSocialIcon(null);
      setRedSocialName('');
      setRedSocialURL('');

        } else if (response.status === 401) {
          console.error('Authentication failed');
          swal('Oops!', 'Usuario o clave equivocados', 'error');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        swal('Oops!', 'Error', 'error');
      }

      
    } else {
      swal('Oops!', 'Error favor de llenar todos los campos o ingresar una URL válida.', 'error');
    }
  };

  const handleEditarClick = async () => {
    if (redSocialName && redSocialURL && redSocialIcon && isURLValid(redSocialURL)) {
      // TODO: Aquí se mandaría la info a la API

      const userData = JSON.parse(localStorage.getItem('userData'));
      // TODO: Aquí se mandaría la info a la API
      try {
        const data = {
          name: redSocialName,
          url: redSocialURL,
          icon: "redSocialIcon",
          id_user_creation: userData._id,
          creation_date: formattedDate,
          id_user_update: userData._id,
          update_date: formattedDate
        };
  
        const response = await fetch(`http://localhost:3001/api/social/updateSocial/${mediaUpdate._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.status === 200) {
          swal('Success!', 'Inicio de sesión exitoso', 'success');
          const responseData = await response.json();
  
          swal('Editado!', 'La red social fue editada correctamente.', 'success');
      // Se resetean los valores para poder agregar más obras
      setRedSocialIcon(null);
      setRedSocialName('');
      setRedSocialURL('');
      setMode("Agregar")
  
          try {
            // Make a GET request
            const response = await fetch(API_ENDPOINTS_SOCIAL_MEDIA.getSocialMedia);
  
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
          swal('Oops!', 'Error al editar la red social', 'error');
        }
      } catch (error) {
        console.error('Error during media update:', error);
        swal('Oops!', 'Error al editar la red social', 'error');
      }

    } else {
      swal('Oops!', 'Error favor de llenar todos los campos o ingresar una URL válida.', 'error');
    }
  };

  const handleEliminarClick = () => {
    swal({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar esta red social.',
      icon: 'warning',
      buttons: ['Cancelar', 'Eliminar'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {

        // TODO: Agrega aquí la lógica para la eliminación del video

        const userData = JSON.parse(localStorage.getItem('userData'));
        try {

          const data = {
            name: redSocialName,
    url: redSocialURL,
    icon: "redSocialIcon",
            id_user_creation: userData._id,
            creation_date: formattedDate,
            id_user_update: userData._id,
            update_date: formattedDate
          };

          const response = await fetch(`http://localhost:3001/api/social/deleteSocial/${mediaUpdate._id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (response.status === 200) {
            const responseData = await response.json();

            swal('Poof! La red social ha sido eliminado.', {
              icon: 'success',
            });
            setRedSocialIcon(null);
            setRedSocialName('');
            setRedSocialURL('');
            setMode("Agregar");

            try {
              // Make a GET request
              const response = await fetch(API_ENDPOINTS_SOCIAL_MEDIA.getSocialMedia);

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
        swal('La red social está a salvo.');
      }
    });
  };

  const loadInfo = async (selectedValue) => {
    if (selectedValue !== '0') {
      const selectedMedia = media.find(m => m._id === selectedValue);
      if (selectedMedia) {
        setMediaUpdate(selectedMedia);
        setRedSocialName(selectedMedia.name);
        setRedSocialURL(selectedMedia.url);
        setRedSocialIcon(null);
        setisFieldDisabled(false);
      }
    }
  };

  return (
    <div className='AdminInfo-card'>
      <div className="EditArtworkiaLefta">
        <div className='Radios'>
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

        <div className="Imagenes-card">
          <div className="GaleriaAdm">
            {mode === 'Agregar' ? (
              <>
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

                  <button className="BotonAddArtwork" onClick={handleGuardarClick}>Guardar</button>
                </div>
              </>
            ) : (
              <>
                <label htmlFor="selectRedSocial">Seleccionar Red Social:</label>
                <select
                  id="selectRedSocial"
                  className="Media-Select Centered"
                  onChange={(e) => loadInfo(e.target.value)}
                >
                  <option value="0">Selecciona una red social</option>
                  {media
                  .filter(m => m.isActive)
                  .map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.name}
                    </option>
                  ))}
                </select>

                <input
                  type="file"
                  id="redSocialIconInputEdit"
                  accept="image/*"
                  onChange={handleRedSocialIconEditChange}
                  style={{ display: 'none' }}
                  disabled={isFieldDisabled}
                />
                <label htmlFor="redSocialIconInputEdit" className="file-input-label">
                  <img
                    src={redSocialIcon || AgregarArte}
                    alt="RedSocial"
                    className="arte-image"
                  />
                </label>


                <div className="ArtworkDetails">
                  <label>Nombre de la Red Social:</label>
                  <input
                    type="text"
                    id="redSocialNameEdit"
                    value={redSocialName}
                    onChange={(e) => setRedSocialName(e.target.value)}
                    disabled={isFieldDisabled}
                  />

                  <label htmlFor="redSocialURL">URL de la Red Social:</label>
                  <input
                    type="text"
                    id="redSocialURLEdit"
                    value={redSocialURL}
                    onChange={(e) => setRedSocialURL(e.target.value)}
                    disabled={isFieldDisabled}
                  />

                  <button className="BotonAddArtwork" onClick={handleEditarClick} disabled={isFieldDisabled}>Editar</button>
                  <button className="BotonAddArtwork" onClick={handleEliminarClick} disabled={isFieldDisabled}>Eliminar</button>
                </div>
              </>
            )}


          </div>
        </div>
      </div>


    </div>
  );
}

export default RedSocialAdmin;