import React, { useState } from 'react';
import '../../assets/CSS/AdminStyle.css';
import ArtistaImg from '../../assets/img/ArtistaEjemplo.jpg';

function AdminInfo() {
  const [nombre, setNombre] = useState('');

  const [isEditingHistoria, setIsEditingHistoria] = useState(false);
  const [historia, setHistoria] = useState('');
  const [artistaImage, setArtistaImage] = useState(null);


  const handleEditAcercaDe = () => {
    if (nombre && historia) {
      console.log(nombre);
      console.log(historia);
      console.log(artistaImage);
      // TODO: Aquí se mandaría la info a la API


      swal('Editado!', 'La información fue editada correctamente.', 'success');
    }
    else {
      swal('Oops!', 'Error favor de llenar todos los campos.', 'error');
    }
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleHistoriaChange = (event) => {
    setHistoria(event.target.value);
  };

  const handleArtistaImageChange = (event) => {
    const selectedImageVar = event.target.files[0];
    if (selectedImageVar) {
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
      const fileExtension = selectedImageVar.name.split('.').pop().toLowerCase();

      if (allowedExtensions.includes(fileExtension)) {
        const newImage = URL.createObjectURL(selectedImageVar);
        setArtistaImage(newImage);
        setArtistaImage([newImage]);
      } else {
        swal('Oops!', 'Error en la extensión del archivo', 'error');
        setArtistaImage(null);
      }
    }
  };

  return (
    <div className="Body3 admb">
      <div className="AdminInfo-card">
        <div className="Foto-Nmb-card">
          <label htmlFor="artistaImageInput">
            <img
              src={artistaImage || ArtistaImg}
              alt="Artista"
              className="artista-image"
            />
          </label>
          <input
            type="file"
            id="artistaImageInput"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleArtistaImageChange}
          />
          <div className="EditNombre">
            <h3>BIENVENIDO</h3>
            <input
              type="text"
              value={nombre}
              onChange={handleNombreChange}
            />
          </div>
        </div>
        <div className="EditAcercaDe">
          <div className="EditHistoriaLeft">
            <textarea
              id="historia"
              placeholder="Historia"
              value={historia}
              onChange={handleHistoriaChange}
              style={{ resize: 'both', overflow: 'auto', minHeight: '100px' }}
            ></textarea>
          </div>
          <div className="EditHistoria">
            <button onClick={handleEditAcercaDe}>Guardar Acerca De</button>
          </div>


        </div>
      </div>
    </div>
  );
}

export default AdminInfo;