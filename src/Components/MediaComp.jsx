import React, { useEffect, useState } from 'react';
import Video from './Video.jsx'
import '../assets/CSS/Video.css';

function VideoComponent() {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchData();
  }, [videos]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/media/getAllMedia');

      if (response.ok) {
        const result = await response.json();
        setVideos(result);
      } else {
        console.error('Failed to fetch data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during data fetching:', error);
      setVideos([]);
    }
  };

  return (
    <div className="Videos">

{videos
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
