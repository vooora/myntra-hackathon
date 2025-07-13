import React, { useState, useEffect } from 'react';
import './results.css';

function Result() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  

  useEffect(() => {
    fetch('http://127.0.0.1:5000/recommend_images')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          console.error('Fetched data is not an array:', data);
          setImages([]);
        }
      })
      .catch(error => console.error('Error fetching recommended images:', error));
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="result-container">
      <h2>Recommended Styles</h2>
      <div className="result-image-container">
        {images.length > 0 && (
          <img
            src={images[currentIndex]}
            alt={`Recommendation ${currentIndex}`}
            className="result-image"
          />
        )}
      </div>
      <div className="result-button-container">
        {images.length > 0 && (
          <button onClick={handleNext} className="next-button">Next</button>
        )}
      </div>
    </div>
  );
}

export default Result;
