import React, { useState } from 'react';
import '../../assets/CSS/AdminStyle.css';
import AgregarArte from '../../assets/img/AgregarArte.jpg';
import swal from 'sweetalert';

function RedSocialAdmin() {
  const [redSocialIcon, setRedSocialIcon] = useState(null);
  const [redSocialName, setRedSocialName] = useState('');
  const [redSocialURL, setRedSocialURL] = useState('');
  const [mode, setMode] = useState('Agregar');
  const [isFieldDisabled, setisFieldDisabled] = useState(false)

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

  const handleEditarClick = () => {
    if (redSocialName && redSocialURL && redSocialIcon && isURLValid(redSocialURL)) {
      console.log(redSocialIcon);
      console.log(redSocialName);
      console.log(redSocialURL);
      // TODO: Aquí se mandaría la info a la API

      swal('Editado!', 'La red social fue editada correctamente.', 'success');
      // Se resetean los valores para poder agregar más obras
      setRedSocialIcon(null);
      setRedSocialName('');
      setRedSocialURL('');
      setMode("Agregar")
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
    }).then((willDelete) => {
      if (willDelete) {
        // TODO: Agrega aquí la lógica para la eliminación del video
        swal('Poof! La red social ha sido eliminado.', {
          icon: 'success',
        });
        setRedSocialIcon(null);
        setRedSocialName('');
        setRedSocialURL('');
        setMode("Agregar");
      } else {
        swal('La red social está a salvo.');
      }
    });
  };

  const loadInfo = (id) => {
    if (id != '0') {
      setRedSocialName(id);
      setisFieldDisabled(false);
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
                  <option value="redSocial1">Red Social 1</option>
                  <option value="redSocial2">Red Social 2</option>
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
