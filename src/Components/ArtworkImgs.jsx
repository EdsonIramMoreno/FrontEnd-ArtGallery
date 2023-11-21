import React, { useEffect, useState } from 'react';
import ObraComponent from '../Components/Obra.jsx';
import { API_ENDPOINTS_POST } from '../Api.js';

import Pinturas from '../assets/img/Pinturas.jpg'

function ArtworkGrid() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/post/getAllPosts');

        if (response.ok) {
          const result = await response.json();
          setPosts(result.data);
        } else {
          console.error('Failed to fetch data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error during data fetching:', error);
        setPosts([]);
      }
    };

    fetchData();
  }, [posts]);

  return (
    <div className="Galeria">
      {posts
        .filter(post => post.isActive)
        .map((post) => (
          <ObraComponent
            key={post_.id}
            name={post.title}
            image={Pinturas}
            id={post._id}
          />
        ))}
    </div>
  );
}

export default ArtworkGrid;