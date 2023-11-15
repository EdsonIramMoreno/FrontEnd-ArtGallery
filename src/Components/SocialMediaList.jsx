import React from 'react';
import SocialMediaItem from './SocialMediaItem'; // Adjust the path

function SocialMediaList() {
  // Example data
  const socialMediaData = [
    {
      icon: '',
      name: 'Nombre',
      url: 'https://www.facebook.com/',
    },
    {
      icon: '',
      name: 'Nombre',
      url: 'https://twitter.com/',
    }
  ];

  return (
    <div className="social-media-list">
      {socialMediaData.map((item, index) => (
        <SocialMediaItem
          key={index}
          icon={item.icon}
          name={item.name}
          url={item.url}
        />
      ))}
    </div>
  );
};

export default SocialMediaList;
