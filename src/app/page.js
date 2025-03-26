'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import FiltersModal from './components/FiltersModal';
import Info from './components/Info';
import ImageSlider from './components/ImageSlider';
import Horizont from './components/Horizontal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]); // Состояние для хранения всех категорий

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes/route.js');
      if (!response.ok) {
        throw new Error('Ошибка при загрузке рецептов');
      }
      const data = await response.json();
      setRecipes(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <>
        <ImageSlider 
          interval={3000}
          images={[
            "/uploads/1742031131822_salat-muraveinik_1594970776_20_max.jpg",
            "/uploads/1742031131903_salat-muraveinik_1594970776_20_max.jpg",
            "/uploads/1742031132058_salat-muraveinik_1594970776_21_max.jpg",
            "/uploads/1742031132238_salat-muraveinik_1594970776_22_max.jpg",
            "/uploads/1742031132320_salat-muraveinik_1594970776_23_max.jpg"
          ]}
        />
      <div className={styles.gg}>
          <Horizont />
        <main className={styles.main}>
          <button className={styles.laman} onClick={openModal}>
            <svg
              width="24"
              height="21"
              viewBox="0 0 24 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line y1="2.5" x2="24" y2="2.5" stroke="white" />
              <line y1="10.5" x2="24" y2="10.5" stroke="white" />
              <line y1="18.5" x2="24" y2="18.5" stroke="white" />
              <rect x="5" width="1" height="5" fill="white" />
              <rect x="18" y="8" width="1" height="5" fill="white" />
              <rect x="11" y="16" width="1" height="5" fill="white" />
            </svg>
            <p>Фильтры</p>
          </button>

          <FiltersModal isOpen={isModalOpen} onClose={closeModal} categories={categories} />

          <div className={styles.gugu}>
  {recipes.map((recipe, index) => (
    <div key={index} className={styles.lenta}>
            <Link href={`/recipe/${recipe.rid}`}>
      <div className={styles.box}>
        <Image
          className={styles.Image}
          src={recipe.images[0]}
          height={150}
          width={150}
          style={{
            width: '100%',
            height: '240px',
            objectFit: 'cover',
          }}
          alt={recipe.title}
        />
      </div>
      <div className={styles.cards}>
        <Info recipes={recipe} />
          <strong className={styles.title}>{recipe.title}</strong>
          <p className={styles.p}>{recipe.description}</p>
      </div>
        </Link>
      <div className={styles.tags}>
        <button>{recipe.categorieKkal}</button>
        <button>{recipe.categorieTime}</button>
        <button>{recipe.category}</button>

      </div>
    </div>
  ))}
</div>
       </main>
      </div>
    </>
  );
}