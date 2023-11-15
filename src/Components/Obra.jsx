import React from 'react';
import { Link } from 'react-router-dom';

function ObraComponent(props) {
  const { id, name, image } = props;

  return (
    <Link to={`/details/${id}/${encodeURIComponent(name)}/${encodeURIComponent(image)}`}>
      <div className="person-card">
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>Ver Obra</p>
      </div>
    </Link>
  );
}

export default ObraComponent;