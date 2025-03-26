'use client'
import { useState, useEffect, useRef } from 'react';
import styles from './ImageSlider.module.css';

const ImageSlider = ({ images = [], interval = 10000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  // Динамическое обновление радиуса
  useEffect(() => {
    const updateRadius = () => {
      if (sliderRef.current) {
        const height = sliderRef.current.offsetHeight;
        sliderRef.current.style.setProperty('--br-radius', `${height*0.45}px`);
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Автопрокрутка
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (!images.length) {
    return <div className={styles.error}>Добавьте изображения</div>;
  }

  return (
    <div className={styles.wrapper} ref={sliderRef}>
      {/* Слайды */}
      <div className={styles.slides}>
        {images.map((img, i) => (
          <div 
            key={i}
            className={`${styles.slide} ${i === currentIndex ? styles.active : ''}`}
          >
            <img
              src={img}
              alt={`Слайд ${i + 1}`}
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
        ))}
      </div>

      {/* Точки навигации */}
      <div className={styles.dotsContainer}>
        {images.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === currentIndex ? styles.active : ''}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;