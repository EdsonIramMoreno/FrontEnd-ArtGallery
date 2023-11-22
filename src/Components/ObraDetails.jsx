import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/CSS/ObraDetails.css'

function Details() {
  const [visible, setVisible] = useState(true);

  const [post, setPost] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    
  
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/post/getAllPosts`);
    
      if (response.ok) {
        const result = await response.json();
    
        // Use find to get the post with the specified id or default to null
        const selectedPost = result.find(post => post.id == id) || null;
    
        setPost(selectedPost);
        console.log(selectedPost);
      } else {
        console.error('Failed to fetch data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during data fetching:', error);
      setPost(null);
    }
    
  };

  return (
    <div className={`mi-componente ${visible ? 'visible' : ''}`}>
      <div className='Body2'>
        <div className="Contenido">
          <div className='Pag-name'>
            <h2>{post.title}</h2>
          </div>

          <div className='Card-Info'>

            <div className="Image-Artwork">
              <img src={post.photo} alt={post.title} />
            </div>

            <div className='Card-Descript'>
              <p>{post.description}</p>
            </div>

          </div>

        </div>
      </div>
    </div>

  );
}

export default Details;
