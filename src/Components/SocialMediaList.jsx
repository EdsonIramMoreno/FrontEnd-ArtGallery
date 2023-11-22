import React, { useEffect, useState } from 'react';
import SocialMediaItem from './SocialMediaItem'; // Adjust the path
import FaceImg from '../assets/img/Facebook.jpg';

function SocialMediaList() {
  const [socialMedia, setSocialMedia] = useState([]);

  // Example data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/social/getAllSocial`);

        if (response.ok) {
          const result = await response.json();
          setSocialMedia(result);
        } else {
          console.error('Failed to fetch data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error during data fetching:', error);
        setSocialMedia([]);
      }
    };

    fetchData();
  }, [socialMedia]);


  return (
    <div className="social-media-list">
      {socialMedia
        .map((media) => (
          <SocialMediaItem
            key={media._id}
            icon={media.icon}
            name={media.username}
            url={media.url} 
          />
        ))}
    </div>
  );
};

export default SocialMediaList;
