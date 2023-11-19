import React, { useState } from 'react';
import '../../assets/CSS/AdminStyle.css';
import AgregarArte from '../../assets/img/AgregarArte.jpg';
import swal from 'sweetalert';

function ArtWorkAdmin() {
  const [artworkImage, setArtworkImage] = useState(null);
  const [artworkName, setArtworkName] = useState('');
  const [artworkDescription, setArtworkDescription] = useState('');
  const [mode, setMode] = useState('Agregar');
  const [isFieldDisabled, setisFieldDisabled] = useState(false);

  const handleMode = (mode) => {
    setMode(mode);

    setArtworkName('');
    setArtworkDescription('');
    setArtworkImage(null);

    if (mode === 'Modificar') {
      setisFieldDisabled(true);
    } else {
      setisFieldDisabled(false);
    }
  };

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

  const handleEditarClick = () => {
    if (artworkName && artworkDescription && artworkImage) {
      console.log('Editar clicked');
      console.log('Artwork Name:', artworkName);
      console.log('Artwork Description:', artworkDescription);
      // TODO: Aquí se mandaría la info a la API

      swal('Editado!', 'La obra fue editada correctamente.', 'success');
      // Se resetean los valores para poder agregar más obras
      setArtworkImage(null);
      setArtworkName('');
      setArtworkDescription('');
      setMode("Agregar");
    } else {
      swal('Oops!', 'Error favor de llenar todos los campos.', 'error');
    }
  };

  const handleEliminarClick = () => {
    // Lógica para la eliminación, por ejemplo, mostrar un mensaje de confirmación
    swal({
      title: '¿Estás seguro?',
      text: 'Una vez eliminada, no podrás recuperar esta obra.',
      icon: 'warning',
      buttons: ['Cancelar', 'Eliminar'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // TODO: Agrega aquí la lógica para la eliminación de la obra
        swal('Poof! La obra ha sido eliminada.', {
          icon: 'success',
        });
        // Se resetean los valores después de eliminar la obra
        setArtworkImage(null);
        setArtworkName('');
        setArtworkDescription('');
        setMode("Agregar");
      } else {
        swal('La obra está a salvo.');
      }
    });
  };

  const loadInfo = (id) => {
    if (id != '0') {
      setArtworkName(id);
      setisFieldDisabled(false);
    }
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

        <div className='Artwork-card'>

          {mode === 'Agregar' ? (
            <>
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

                <button className="BotonAddArtwork" onClick={handleGuardarClick}>Guardar</button>
              </div>
            </>
          ) : (
            <>


              <label htmlFor="selectRedSocial">Seleccionar obra:</label>
              <select
                id="selectRedSocial"
                className="Media-Select Centered"
                onChange={(e) => loadInfo(e.target.value)}>
                <option value="0">Selecciona una obra</option>
                <option value="Obra1">Obra 1</option>
                <option value="Obra2">Obra 2</option>
                <option value="Obra3">Obra 3</option>
                <option value="Obra4">Obra 4</option>
              </select>
              <div className="ArtworkDetails">
                <div className="MediaDetails">

                  <input
                    type="file"
                    id="artworkImageInputEdit"
                    accept="image/*"
                    onChange={handleArtworkImageChange}
                    style={{ display: 'none' }}
                    disabled={isFieldDisabled}
                  />
                  <label htmlFor="artworkImageInputEdit" className="file-input-label">
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
                  id="artworkNameEdit"
                  value={artworkName}
                  onChange={(e) => setArtworkName(e.target.value)}
                  disabled={isFieldDisabled}
                />

                <label>Descripción de la Obra:</label>
                <textarea
                  id="artworkDescriptionEdit"
                  value={artworkDescription}
                  onChange={(e) => setArtworkDescription(e.target.value)}
                  style={{ resize: 'both', overflow: 'auto', minHeight: '100px' }}
                  disabled={isFieldDisabled}
                ></textarea>

                <button className="BotonAddArtwork" onClick={handleEditarClick} disabled={isFieldDisabled}>Editar</button>
                <button className="BotonAddArtwork" onClick={handleEliminarClick} disabled={isFieldDisabled}>Eliminar</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtWorkAdmin;
