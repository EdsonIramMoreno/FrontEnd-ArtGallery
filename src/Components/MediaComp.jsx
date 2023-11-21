import React, { useEffect, useState } from 'react';
import Video from './Video.jsx'
import '../assets/CSS/Video.css';
import { API_ENDPOINTS_MEDIA } from '../Api.js';

function VideoComponent() {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/media/getAllMedia');

        if (response.ok) {
          const result = await response.json();
          setVideos(result.data);
        } else {
          console.error('Failed to fetch data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error during data fetching:', error);
        setVideos([]);
      }
    };

    fetchData();
  }, [videos]);

  return (
    <div className="Videos">

{videos
        .filter(video => video.isActive)
        .map((video) => (
          <Video
          src={video.url}
          title={video.title}
          />
        ))}

      
    </div>
  );
}

export default VideoComponent;