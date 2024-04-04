import React, { useState, useEffect } from 'react';
import countapi from 'countapi-js';

const VisitCountComponent = () => {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    countapi.visits('global')
      .then((result) => {
        setVisitCount(result.value);
      })
      .catch((error) => {
        console.error('Error fetching visit count:', error);
      });
  }, []);
  console.log(visitCount);
  return (
    <p className='dataTracker'>{visitCount} people touched grass</p>
  );
};

export default VisitCountComponent;