

import React, { useState, useEffect } from 'react';

const TotalVisitors = () => {
  const [totalVisitors, setTotalVisitors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalVisitors = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/total-visitors');


        console.log('API Response:', response)
        
        if (!response.ok) {
          
          throw new Error('Failed to fetch data');
        }
        console.log('Response status:', response.status);
        console.log('Response content type:', response.headers.get('content-type'));
        
        const data = await response.json();
        
        console.log('Response data:', data);
        setTotalVisitors(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchTotalVisitors();
  }, []);

  return (
    <div className='dataTracker'>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>"bugs in getting data"</p>
      ) : (
        <p>{totalVisitors} people touched grass :)</p>
      )}
    </div>
  );
};

export default TotalVisitors;