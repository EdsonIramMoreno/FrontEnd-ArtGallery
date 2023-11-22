import React from 'react';

function SocialMediaItem(props) {
  const handleRedirect = () => {
    window.open(props.url, '_blank'); // Open the link in a new tab
  };

  return (
    <div className="social-media-item" onClick={handleRedirect}>
      <img src={props.icon} 
      alt={props.name} 
      style={{ width: '45px', height: '45px', marginRight: '8px' }}/>
      <p>{props.name}</p>
    </div>
  );
};

export default SocialMediaItem;