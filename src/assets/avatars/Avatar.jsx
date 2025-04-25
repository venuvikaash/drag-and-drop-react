import React from 'react';

const Avatar = ({ name, size = 40 }) => {
  // Function to convert string to consistent color
  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  };

  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const bgColor = stringToColor(name);
  const initials = getInitials(name);
  const textColor = '#FFFFFF';

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill={bgColor} />
      <text 
        x="50%" 
        y="50%" 
        textAnchor="middle" 
        dy=".3em" 
        fill={textColor}
        fontFamily="Arial"
        fontSize="16"
        fontWeight="bold"
      >
        {initials}
      </text>
    </svg>
  );
};

export default Avatar;