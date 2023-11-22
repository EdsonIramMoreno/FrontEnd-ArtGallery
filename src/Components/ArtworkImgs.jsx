import React, { useEffect, useState } from 'react';

import ObraComponent from '../Components/Obra.jsx'

function ArtworkGrid() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/post/getAllPosts');

        if (response.ok) {
          const result = await response.json();
          setPosts(result);
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
        .map((post) => (
          <ObraComponent
            key={post.id}
            name={post.title}
            image={post.photo}
            id={post.id}
          />
        ))}

    </div>

  );
}

export default ArtworkGrid;
