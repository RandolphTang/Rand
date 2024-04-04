import React, { useState, useEffect } from 'react';

const VisitCountComponent = () => {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const updateVisitCount = async () => {
      try {
        const ipAddress = await fetch('https://api.countapi.xyz/getip');
        const ipData = await ipAddress.json();
        const response = await fetch(`https://api.countapi.xyz/hit/${ipData.ip}`);
        const data = await response.json();
        setVisitCount(data.value);
      } catch (error) {
        console.error('Error updating visit count:', error);
      }
    };

    updateVisitCount();
  }, []); // Empty dependency array to run effect only once

  return (
    
      <p className='dataTracker'>This page was viewed {visitCount}</p>

      
  );
};

export default VisitCountComponent;