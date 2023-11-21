import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_ENDPOINTS_POST } from '../Api';

function ObraDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/post/getAllPosts');
        if (response.ok) {
          const result = await response.json();
  
          const selectedPost = result.data.find(post => post._id === String(id));
          setPost(selectedPost);
        } else {
          console.error('Failed to fetch data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error during data fetching:', error);
        setPost(null);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
  }, [post]);
  
  

  return (
    <div className="mi-componente">
      <div className='Body2'>
        <div className="Contenido">
          {post ? (
            <>
              <div className='Pag-name'>
                <h2>{post.title}</h2>
              </div>
  
              <div className='Card-Info'>
                <div className="Image-Artwork">
                  <img src={post.photo} alt={post.title} />
                </div>
  
                <div className='Card-Descript'>
                  <p>{post.desc}</p>
                </div>
              </div>
            </>
          ) : (
            // Render loading message when post is null
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
  
}

export default ObraDetails;