import React, { useEffect, useState } from 'react';
import '../../assets/CSS/AdminStyle.css';
import AgregarArte from '../../assets/img/AgregarArte.jpg';
import swal from 'sweetalert';
import { sendImage } from '../../firebase';

function RedSocialAdmin() {
  const [redSocialIcon, setRedSocialIcon] = useState(null);
  const [redSocialName, setRedSocialName] = useState('');
  const [redSocialURL, setRedSocialURL] = useState('');
  const [mode, setMode] = useState('Agregar');
  const [isFieldDisabled, setisFieldDisabled] = useState(false)

  const [selectedImage, setSelectedImage] = useState(null);

  const [media, setMedia] = useState([]);
  const [mediaUpdate, setMediaUpdate] = useState([]);

  useEffect(() => {
        // Call the fetchData function when the component mounts
    fetchData();
  }, [mediaUpdate, media]);

  const fetchData = async () => {
    try {
      // Make a GET request
      const response = await fetch('http://localhost:3001/api/social/getAllSocial');

      // Check if the request was successful (status code 200)
      if (response.ok) {
        // Parse the response JSON
        const result = await response.json();

        // Update the state with the fetched data
        setMedia(result);

      } else {
        console.error('Failed to fetch data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during data fetching:', error);
      setMedia([]);
    }
  };


  const handleRedSocialIconChange = (event) => {
    const selectedImageFile = event.target.files[0];
    setSelectedImage(event.target.files[0]);

    if (selectedImageFile) {
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
      const fileExtension = selectedImageFile.name.split('.').pop().toLowerCase();
  
      if (allowedExtensions.includes(fileExtension)) {
        setSelectedImage(selectedImageFile);
        const newImage = URL.createObjectURL(selectedImageFile);
        setRedSocialIcon(newImage);
      } else {
        swal('Oops!', 'Error en la extensión del archivo', 'error');
        setRedSocialIcon(null);
      }
    }
  };

  const handleRedSocialIconEditChange = (event) => {
    const selectedImageFile = event.target.files[0];
    setSelectedImage(event.target.files[0]);

    if (selectedImageFile) {
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
      const fileExtension = selectedImageFile.name.split('.').pop().toLowerCase();
  
      if (allowedExtensions.includes(fileExtension)) {
        setSelectedImage(selectedImageFile);
        const newImage = URL.createObjectURL(selectedImageFile);
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
    const urlRegex = /www\.[^ "]+\.com$/;
    return urlRegex.test(url);
};

  const handleGuardarClick = async () => {
    let downloadURL;
    if (redSocialName && redSocialURL && redSocialIcon && isURLValid(redSocialURL)) {

      const storedUserData = JSON.parse(localStorage.getItem('userData'));
      // TODO: Aquí se mandaría la info a la API

      downloadURL = await sendImage(selectedImage);

      try{

        const data = {
          username: redSocialName,
          url: redSocialURL,
          icon: downloadURL.downloadURL,
          id_user_create: storedUserData.userId,
          id_user_update: storedUserData.userId
        }

        const response = await fetch('http://localhost:3001/api/social/createSocial', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        if(response.status === 200){
          swal('Agregado!', 'La red social fue agregada correctamente.', 'success');

          setRedSocialIcon(null);
          setRedSocialName('');
          setRedSocialURL('');
        }

      }
      catch(error){
        console.log(error);
      }
    } else {
      swal('Oops!', 'Error favor de llenar todos los campos o ingresar una URL válida.', 'error');
    }
  };

  const handleEditarClick = async () => {
    let downloadURL;
    if (redSocialName && redSocialURL && redSocialIcon && isURLValid(redSocialURL)) {
      // TODO: Aquí se mandaría la info a la API
      const storedUserData = JSON.parse(localStorage.getItem('userData'));
      // TODO: Aquí se mandaría la info a la API

      downloadURL = await sendImage(selectedImage);
      try{

        const data = {
          username: redSocialName,
          url: redSocialURL,
          icon: downloadURL.downloadURL,
          id_user_create: storedUserData.userId,
          id_user_update: storedUserData.userId
        }

        const response = await fetch(`http://localhost:3001/api/social/updateSocial/${mediaUpdate.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        if(response.status === 200){
          swal('Editado!', 'La red social fue editada correctamente.', 'success');
      // Se resetean los valores para poder agregar más obras
      setRedSocialIcon(null);
      setRedSocialName('');
      setRedSocialURL('');
      setMode("Agregar");

      fetchData();
        }

      }
      catch(error){
        console.log(error);
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

        const response = await fetch(`http://localhost:3001/api/social/deleteSocial/${mediaUpdate.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {

          // TODO: Agrega aquí la lógica para la eliminación del video
          swal('Poof! La red social ha sido eliminado.', {
            icon: 'success',
          });
          setRedSocialIcon(null);
          setRedSocialName('');
          setRedSocialURL('');
          setMode("Agregar");

          fetchData();
        }
      } else {
        swal('La red social está a salvo.');
      }
    });
  };

  const loadInfo = async (selectedValue) => {
    console.log(selectedValue)
    if (selectedValue !== '0') {
      const selectedMedia = media.find(m => m.id == selectedValue);
      if (selectedMedia) {
        console.log(selectedMedia)
        
        setMediaUpdate(selectedMedia);
        setRedSocialName(selectedMedia.username);
        setRedSocialURL(selectedMedia.url);
        setRedSocialIcon(selectedMedia.icon);

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
                  {/* TODO: Aquí se agregarían todas las redes sociales */}
                  <option value="0">Selecciona una red social</option>
                  {media
                  .map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.username}
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
