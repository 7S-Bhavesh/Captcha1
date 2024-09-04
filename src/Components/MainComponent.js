import React, { useEffect, useState, useCallback } from 'react';

const MainComponent = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    // Collect mouse movements and other environmental data
    const handleMouseMove = (event) => {
      setData({
        mouseX: event.clientX,
        mouseY: event.clientY,
        timestamp: new Date().getTime(),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Clean up event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Wrap sendDataToBackend in useCallback to memoize it
  const sendDataToBackend = useCallback(async () => {
    if (Object.keys(data).length > 0) {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/collect-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log('Prediction result:', result.prediction);
      } catch (error) {
        console.error('Error sending data:', error);
      }
    }
  }, [data]); // Include data as a dependency

  useEffect(() => {
    sendDataToBackend();
  }, [sendDataToBackend]); // Include sendDataToBackend in the dependency array

  return <div>Interact with this page to collect data.</div>;
};

export default MainComponent;
