import React, { useState } from 'react';
import '../assets/CSS/AdminStyle.css';
import ArtistaImg from '../assets/img/ArtistaEjemplo.jpg'


function AdminInfo() {
  const [isEditingNombre, setIsEditingNombre] = useState(false);
  const [nombre, setNombre] = useState('NOMBRE');

  const [isEditingHistoria, setIsEditingHistoria] = useState(false);
  const [historia, setHistoria] = useState('');
  const [historiaEditada, setHistoriaEditada] = useState('');

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

  return (
    <div className='Body3'>
      <div className="AdminInfo-card">
        <div>
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
            <div>
              <h1>Bienvenido {nombre}</h1>
              <div className="EditNombre">
                <button onClick={handleEditNombreClick}>Editar Nombre</button>
              </div>
            </div>
          )}
        </div>
        <div className="EditAcercaDe">
          <div className="EditHistoriaLeft">
          <img src={ArtistaImg} alt="Artista" />
            {isEditingHistoria ? (
              <textarea
                id="historia"
                placeholder="Historia"
                value={historia}
                onChange={handleHistoriaChange}
                style={{ resize: 'both', overflow: 'auto', minHeight: '100px' }}
              ></textarea>
            ) : (
              <div>
                <h2>{nombre || 'Nombre'}</h2>
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
        </div>
        
        <h1>Zapatos</h1>
      </div>
      <div className='NavAdmin'>
        {/* <NavAdmin /> */}
      </div>
    </div>
  );
}

export default AdminInfo;