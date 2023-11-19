import React from 'react';
import SocialMediaItem from './SocialMediaItem'; // Adjust the path
import FaceImg from '../assets/img/Facebook.jpg';

function SocialMediaList() {
  // Example data
  const socialMediaData = [
    {
      icon: {FaceImg},
      name: 'Facebook',
      url: 'https://www.facebook.com/',
    },
    {
      icon: '',
      name: 'X',
      url: 'https://twitter.com/',
    },
    {
      icon: '',
      name: 'Instagram',
      url: 'https://Instagam.com/',
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
