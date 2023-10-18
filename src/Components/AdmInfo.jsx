import React, { useState } from 'react';
import '../assets/CSS/AdminStyle.css';
import ArtistaImg from '../assets/img/ArtistaEjemplo.jpg';
import AgregarArte from '../assets/img/AgregarArte.jpg';
import NavAdmin from './NavAdmin';

function AdminInfo() {
  const [isEditingNombre, setIsEditingNombre] = useState(false);
  const [nombre, setNombre] = useState('NOMBRE');

  const [isEditingHistoria, setIsEditingHistoria] = useState(false);
  const [historia, setHistoria] = useState('');
  const [historiaEditada, setHistoriaEditada] = useState('');
  const [artistaImage, setArtistaImage] = useState(null);
  const [artworkImage, setArtworkImage] = useState(null);

  const handleEditNombreClick = () => {
    setIsEditingNombre(true);
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleEditNombreComplete = () => {
    setIsEditingNombre(false);
  };

  const handleEditHistoriaClick = () => {
    setIsEditingHistoria(true);
  };

  const handleHistoriaChange = (event) => {
    setHistoria(event.target.value);
  };

  const handleEditHistoriaComplete = () => {
    setIsEditingHistoria(false);
    setHistoriaEditada(historia); // Guardar la historia editada
  };

  const handleArtistaImageChange = (event) => {
    const selectedImage1 = event.target.files[0];
    if (selectedImage1) {
      setArtistaImage(URL.createObjectURL(selectedImage1));
    }
  };

  const [artworkImages, setArtworkImages] = useState([]); // Estado para almacenar múltiples imágenes de Artwork

  const handleArtworkImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const newImage = URL.createObjectURL(selectedImage);
      setArtworkImages([...artworkImages, newImage]); // Agrega la nueva imagen al estado de imágenes
    }
  };

  return (
    <div className="Body3">
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
          {isEditingNombre ? (
            <div className="EditNombre">
              <input
                type="text"
                value={nombre}
                onChange={handleNombreChange}
              />
              <button onClick={handleEditNombreComplete}>Guardar</button>
            </div>
          ) : (
            <div className="Bienvenida-card">
              <h1>BIENVENIDO {nombre}</h1>
              <div className="EditNombre">
                <button onClick={handleEditNombreClick}>Editar Nombre</button>
              </div>
            </div>
          )}
        </div>
        <div className="EditAcercaDe">
          <div className="EditHistoriaLeft">
            <h2>Acerca De</h2>
            {isEditingHistoria ? (
              <textarea
                id="historia"
                placeholder="Historia"
                value={historia}
                onChange={handleHistoriaChange}
                style={{ resize: 'both', overflow: 'auto', minHeight: '100px' }}
              ></textarea>
            ) : (
              <div className="EditHistoria-card">
                <p>{historiaEditada ? historiaEditada : 'Texto de historia aquí.'}</p>
              </div>
            )}
          </div>
          <div className="EditHistoria">
            {isEditingHistoria ? (
              <button onClick={handleEditHistoriaComplete}>Guardar</button>
            ) : (
              <button onClick={handleEditHistoriaClick}>Editar Historia</button>
            )}
          </div>
          <div className="EditArtworkiaLeft">
            <h2>Artwork</h2>
            <div className='Imagenes-card'>
            <div className="GaleriaAdm">
              <label htmlFor="artworkImageInput">
                <img
                  src={artworkImage || AgregarArte}
                  alt="Arte"
                  className="arte-image"
                />
              </label>
              <input
                type="file"
                id="artworkImageInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleArtworkImageChange}
              />
            </div>
            <div className="ArtworkGallery">
              {artworkImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Arte ${index}`}
                  className="arte-image"
                />
              ))}
            </div>
          </div>
            </div>

        </div>
      </div>
    </div>
  );
}

export default AdminInfo;
