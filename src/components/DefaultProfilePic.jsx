import React from 'react';

const DefaultProfilePic = ({ name, size = 40, fontSize = 16 }) => {
  // Generate a consistent color based on name
  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = '#' + ('00000' + (hash & 0xFF0000).toString(16)).slice(-6);
    return color;
  };

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return '?';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };

  const backgroundColor = stringToColor(name || 'User');
  const initials = getInitials(name);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontSize: `${fontSize}px`,
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }}
    >
      {initials}
    </div>
  );
};

export default DefaultProfilePic; 