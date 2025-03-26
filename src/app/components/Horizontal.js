// components/HorizontalScroll.js
import React, { useRef, useEffect } from 'react';
import styles from "./Horizontal.module.css";
import Image from 'next/image';

const HorizontalScroll = () => {
  const scrollContainerRef = useRef(null);

  // Обработчик события wheel
  const handleWheel = (event) => {
      const scrollAmount = event.deltaY*10;
    if (scrollContainerRef.current) {
      // Отменяем стандартное поведение прокрутки страницы
      event.preventDefault();

      // Прокручиваем контейнер по горизонтали
      scrollContainerRef.current.scrollBy({
        left: scrollAmount, // Используем deltaY для горизонтальной прокрутки
        behavior: 'smooth', // Плавная прокрутка
      });
    }
  };

  // Добавляем и удаляем обработчик события wheel
  useEffect(() => {
    const container = scrollContainerRef.current;

    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });

      // Удаляем обработчик при размонтировании компонента
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  const cards = [
    { id: 1, title: 'Карточка 1' ,image:"/uploads/1742031131822_salat-muraveinik_1594970776_20_max.jpg"},
    { id: 2, title: 'Карточка 2' ,image:"/uploads/1742031131822_salat-muraveinik_1594970776_20_max.jpg"},
    { id: 3, title: 'Карточка 3' ,image:"/uploads/1742031131822_salat-muraveinik_1594970776_20_max.jpg"},
    { id: 4, title: 'Карточка 4' ,image:"/uploads/1742031131822_salat-muraveinik_1594970776_20_max.jpg"},
    { id: 5, title: 'Карточка 5' ,image:"/uploads/1742031131822_salat-muraveinik_1594970776_20_max.jpg"},
    { id: 6, title: 'Карточка 6' ,image:"/uploads/1742031131822_salat-muraveinik_1594970776_20_max.jpg"},
    { id: 7, title: 'Карточка 7' ,image:"/uploads/1742031131822_salat-muraveinik_1594970776_20_max.jpg"},
    { id: 8, title: 'Карточка 8' ,image:"/uploads/1742031131822_salat-muraveinik_1594970776_20_max.jpg"},
    { id: 9, title: 'Карточка 9' ,image:"/uploads/1742031131822_salat-muraveinik_1594970776_20_max.jpg"},
    { id: 10, title: 'Карточка 10'  ,image:"/uploads/1742031131822_salat-muraveinik_1594970776_20_max.jpg"},
  ]

  return (
    <div  ref={scrollContainerRef} className={styles.scrollContainer}>
      {cards.map((card) => (
        <div key={card.id} className={styles.card}>
          {/* Фоновое изображение */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}>
            <Image
              src={card.image} // Путь к изображению
              alt="Фон карточки"
              layout="fill" // Заполняет весь контейнер
              objectFit="cover" // Растягивает изображение
              quality={100} // Качество изображения
            />
          </div>

          {/* Контент карточки */}
          <div className={styles.content}>
            <button>{card.title}<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.7071 8.70711C17.0976 8.31658 17.0976 7.68342 16.7071 7.29289L10.3431 0.928932C9.95262 0.538408 9.31946 0.538408 8.92893 0.928932C8.53841 1.31946 8.53841 1.95262 8.92893 2.34315L14.5858 8L8.92893 13.6569C8.53841 14.0474 8.53841 14.6805 8.92893 15.0711C9.31946 15.4616 9.95262 15.4616 10.3431 15.0711L16.7071 8.70711ZM0 9H16V7H0V9Z" fill="white"/>
</svg>
</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HorizontalScroll;