import React, { useEffect, useState } from 'react';
import '../../assets/CSS/AdminStyle.css';
import AgregarArte from '../../assets/img/AgregarArte.jpg';
import swal from 'sweetalert';
import { sendImage } from '../../firebase';

function ArtWorkAdmin() {
  const [artworkImage, setArtworkImage] = useState(null);
  const [artworkName, setArtworkName] = useState('');
  const [artworkDescription, setArtworkDescription] = useState('');
  const [mode, setMode] = useState('Agregar');
  const [isFieldDisabled, setisFieldDisabled] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [posts, setPosts] = useState([]);
  const [postsUpdate, setPostsUpdate] = useState([]);

  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData();
  }, [postsUpdate, posts]);

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
    setSelectedImage(event.target.files[0]);

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

  const handleGuardarClick = async () => {
    
    let downloadURL;
    if (artworkName && artworkDescription && artworkImage) {

      const storedUserData = JSON.parse(localStorage.getItem('userData'));
      // TODO: Aquí se mandaría la info a la API, agregar un campo desctiption a la tabla posts

      downloadURL = await sendImage(selectedImage);

      try{

        const data = {
          title: artworkName,
          photo: downloadURL.downloadURL,
          id_user_create: storedUserData.userId,
          id_user_update: storedUserData.userId,
          description: artworkDescription
        }

        const response = await fetch('http://localhost:3001/api/post/createPost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if(response.status === 200){
          swal('Agregado!', 'La obra fue agregada correctamente.', 'success');
        }
      }
      catch(error){
        console.log(error);
      }

      // Se resetean los valores para poder agregar más obras
      setArtworkImage(null);
      setArtworkName('');
      setArtworkDescription('');
    } else {
      swal('Oops!', 'Error favor de llenar todos los campos.', 'error');
    }
  };

  const handleEditarClick = async () => {
    let downloadURL;
    if (artworkName && artworkDescription && artworkImage) {

      const storedUserData = JSON.parse(localStorage.getItem('userData'));

      downloadURL = await sendImage(selectedImage);

      // TODO: Aquí se mandaría la info a la API
      try {

        const data = {
          title: artworkName,
          photo: downloadURL.downloadURL,
          id_user_create: storedUserData.userId,
          id_user_update: storedUserData.userId,
          description: artworkDescription
        };

        const response = await fetch(`http://localhost:3001/api/post/updatePost/${postsUpdate.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.status === 200) {
          swal('Success!', 'Inicio de sesión exitoso', 'success');
          const responseData = await response.json();

          swal('Editado!', 'La obra fue editada correctamente.', 'success');

          // Se resetean los valores para poder agregar más obras
          setArtworkImage(null);
          setArtworkName('');
          setArtworkDescription('');
          setMode("Agregar");

          fetchData();

        }
      } catch (error) {
        console.error('Authentication error:', error);
        swal('Oops!', 'Error', 'error');
      }
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
    }).then(async (willDelete) => {
      if (willDelete) {

        const response = await fetch(`http://localhost:3001/api/post/deletePost/${postsUpdate.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {


        // TODO: Agrega aquí la lógica para la eliminación de la obra
        swal('Poof! La obra ha sido eliminada.', {
          icon: 'success',
        });
        // Se resetean los valores después de eliminar la obra
        setArtworkImage(null);
        setArtworkName('');
        setArtworkDescription('');
        setMode("Agregar");

        fetchData();
      }
      } else {
        swal('La obra está a salvo.');
      }
    });
  };

  const loadInfo = async (selectedValue) => {
    if (selectedValue !== '0') {
      const selectedPost = posts.find(post => post.id == selectedValue);
      // Check if the post is found
      if (selectedPost) {

        await setPostsUpdate((prevPostsUpdate) => ({
          ...prevPostsUpdate,
          ...selectedPost,
        }));

        setArtworkName(selectedPost.title);
        setArtworkImage(selectedPost.photo);
        setArtworkDescription(selectedPost.description);

        setisFieldDisabled(false);
      }
    }
  };

  const fetchData = async () => {
    try {
      // Make a GET request
      const response = await fetch('http://localhost:3001/api/post/getAllPosts');

      // Check if the request was successful (status code 200)
      if (response.ok) {
        // Parse the response JSON
        const result = await response.json();

        // Update the state with the fetched data
        setPosts(result);

      } else {
        console.error('Failed to fetch data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during data fetching:', error);
      setPosts([]);
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
                {posts
                  .map((post) => (
                    <option key={post.id} value={post.id}>
                      {post.title}
                    </option>
                  ))}
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
