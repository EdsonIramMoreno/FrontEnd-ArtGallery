import React, { useEffect, useState } from 'react';
import '../../assets/CSS/AdminStyle.css';
import ArtistaImg from '../../assets/img/ArtistaEjemplo.jpg';
import { sendImage } from '../../firebase';

function AdminInfo() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [about, setAbout] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [isEditingHistoria, setIsEditingHistoria] = useState(false);
  const [historia, setHistoria] = useState('');
  const [artistaImage, setArtistaImage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/about/getAbout/1`);

      if (response.ok) {
        const result = await response.json();
          const aboutData = result;
          console.log(aboutData)
          setAbout(aboutData);
          setNombre(aboutData.artist_name);
          setHistoria(aboutData.resume);
          setCorreo(aboutData.email)
          setArtistaImage(aboutData.photo);
        
      } else {
        console.error('Failed to fetch data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during data fetching:', error);
      setAbout([]);
    }
  };


  const handleEditAcercaDe = async () => {
    let downloadURL;
    if (nombre && historia && correo && selectedImage!=null) {

      const storedUserData = JSON.parse(localStorage.getItem('userData'));

      downloadURL = await sendImage(selectedImage);

      // TODO: Aquí se mandaría la info a la API

      try{
        const data = {
          email: correo,
          artist_name: nombre,
          resume: historia,
          photo: downloadURL.downloadURL,
          updated_by_user_id: storedUserData.userId
        }

        const response = await fetch('http://localhost:3001/api/about/updateAbout/1', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if(response.status === 200){
          swal('Editado!', 'La información fue editada correctamente.', 'success');
        }

      }
      catch(error){
        console.log(error)
      }

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

  const handleCorreoChange = (event) => {
    setCorreo(event.target.value);
  };

  const handleArtistaImageChange = (event) => {
    const selectedImageFile = event.target.files[0];
    setSelectedImage(event.target.files[0]);

    if (selectedImageFile) {
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
      const fileExtension = selectedImageFile.name.split('.').pop().toLowerCase();
  
      if (allowedExtensions.includes(fileExtension)) {
        setSelectedImage(selectedImageFile);
        const newImage = URL.createObjectURL(selectedImageFile);
        setArtistaImage(newImage);
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

          <label htmlFor="">Ingrese un correo</label>
            <input
              type="text"
              value={correo}
              onChange={handleCorreoChange}
            />
          <div className="EditHistoria">
            <button onClick={handleEditAcercaDe}>Guardar Acerca De</button>
          </div>


        </div>
      </div>
    </div>
  );
}

export default AdminInfo;