'use client'
import { useEffect, useState } from 'react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Показываем кнопку при прокрутке
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) { // Показываем кнопку после прокрутки на 300px
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Прокручиваем страницу вверх
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Плавная прокрутка
    });
  };

  return (
    <button
      style={{
        display: isVisible ? 'block' : 'none',
        position: 'fixed',
        bottom: '20px',
        width: '48px',
        height: '48px',
        right: '20px',
        padding: '10px 15px',
        fontSize: '18px',
        color: 'white',
        backgroundColor: '#99cc33',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease',
        zIndex: '1000',
      }}
      onClick={scrollToTop}
    >
      ↑
    </button>
  );
}