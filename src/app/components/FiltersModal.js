import { useState, useEffect } from 'react';
import styles from './Filters.module.css';

const FiltersModal = ({ isOpen, onClose, categories }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Функция для обработки нажатия клавиши Esc
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };2

  // Добавляем обработчик события keydown при монтировании компонента
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Убираем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>Фильтры</h2>
        <div className={styles.filtersContainer}>
          {categories.map((category, index) => (
            <button
              key={index}
              className={`${styles.filterButton} ${
                selectedCategories.includes(category) ? styles.selected : ''
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <button type="submit" className={styles.applyButton}>
          Применить
        </button>
      </div>
    </div>
  );
};

export default FiltersModal;