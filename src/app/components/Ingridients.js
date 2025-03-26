'use client'
import React, { useState } from 'react';
import styles from './Ingridients.module.css'; // Импортируем стили
import Info from './Info';
import Image from 'next/image';
import ImageCollage from './ImageCollage';

const IngredientsTable = ({ ingredients }) => {
  const [showAll, setShowAll] = useState(false);
  const [portions, setPortions] = useState(ingredients.portion); // Изначальное количество порций

  const ArrayOfIngredients = ingredients.ingredients;
  const visibleIngredients = showAll ? ArrayOfIngredients : ArrayOfIngredients.slice(0, 7);
  const portionValue = portions/ingredients.portion;

  // Функция для увеличения количества порций
  const increasePortions = () => {
    setPortions(prevPortions => prevPortions + 1);
  };

  // Функция для уменьшения количества порций
  const decreasePortions = () => {
    if (portions > 1) {
      setPortions(prevPortions => prevPortions - 1);
    }
  };2

  // Функция для форматирования числа (убирает .00, если они не нужны)
  const formatQuantity = (value) => {
    const quantity = value / ingredients.portion * portions;
    return quantity % 1 === 0 ? quantity.toString() : quantity.toFixed(2).replace(/\.?0+$/, '');
  };

  return (
    <div className={styles.lala}>
      <div className={styles.qwerty}>
        
      <div className={styles.portion}>
      
      <button onClick={decreasePortions} className={styles.calc}>
        <svg width="36" height="36" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="21" cy="21" r="19" stroke="#99CC33" strokeWidth="4"/>
          <line x1="13" y1="20" x2="29" y2="20" stroke="#003333" strokeWidth="4"/>
        </svg>
      </button>
      <p>{portions}</p>
      <button onClick={increasePortions} disabled={portions>=10}className={styles.calc}>
        <svg width="36" height="36" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="21" cy="21" r="19" stroke="#99CC33" strokeWidth="4"/>
          <line x1="13" y1="20" x2="29" y2="20" stroke="#003333" strokeWidth="4"/>
          <line x1="21" y1="28" x2="21" y2="12" stroke="#003333" strokeWidth="4"/>
        </svg>
      </button>
      </div>
      <div className={styles.info}>
        <div className={styles.kkal}>
          <div className={styles.kal}>
            <Image
              src="/icon/fire.png"
              width={45}
              height={45}
              alt="kal"
            />
            <p>кaлории</p>
          </div>
          <p>{(ingredients.kkal*portionValue).toFixed(0)}</p>
        </div>

        <div className={styles.belki}>
          <div className={styles.bel}>
            <Image
              src="/icon/belki.png"
              width={45}
              height={45}
              alt="bel"
            />
            <p>белки</p>
          </div>
          <p>{(ingredients.bel*portionValue).toFixed(0)} г.</p>
        </div>

        <div className={styles.oily}>
          <div className={styles.oil}>
            <Image
              src="/icon/fats.png"
              width={45}
              height={45}
              alt="oil"
            />
            <p >жиры</p>
          </div>
          <p>{(ingredients.fats*portionValue).toFixed(0)} г.</p>
        </div>

        <div className={styles.carbs}>
          <div className={styles.carb}>
            <Image
              src="/icon/carbs.png"
              width={45}
              height={45}
              alt="oil"
            />
            <p>углеводы</p>
          </div>
          <p>{(ingredients.carbs*portionValue).toFixed(0)} г.</p>
        </div>

        <div className={styles.clock}>
          <Image
            src="/icon/clock.png"
            width={80}
            height={80}
            alt="clock"
          />
          <p>{ingredients.cookingTime}</p>
        </div>
      </div>
      </div>
      <div className={styles.ArrayIngred}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ингредиент</th>
            <th>Количество</th>
          </tr>
        </thead>
        <tbody>
          {visibleIngredients.map((ingredient, index) => (
            <tr key={index}>
              <td>{ingredient.name}</td>
              <td>{formatQuantity(ingredient.value)} {ingredient.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Кнопка для разворачивания списка */}
      {ArrayOfIngredients.length > 7 && (
        <button 
        className={styles.button}
        onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Свернуть список' : 'Развернуть список'}
        </button>
      )}
      </div>
      </div>
           
  );
};

export default IngredientsTable;