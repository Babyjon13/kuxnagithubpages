'use client'
import styles from "./page.module.css";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import IngredientsTable from "@/app/components/Ingridients";
import ImageCollage from "@/app/components/ImageCollage";

export default function RecipePage() {
  const { rid } = useParams(); // Получаем rid из URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipe/${rid}`);
        if (!response.ok) {
          throw new Error('Рецепт не найден');
        }
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [rid]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;


  return (
      <main className={styles.main}>
      <div className={styles.titlemajor}>
        <div className={styles.carbonara}>
      <h3 className={styles.title}>{recipe.title}</h3>
              <IngredientsTable  ingredients={recipe} />
              </div>
              <div className={styles.imagecol}>
             <ImageCollage 
              images={recipe.images}
              />
              </div>
      </div>
            
      <h2 className={styles.description}>{recipe.description}</h2>



        <div className={styles.steps}>
        <h2>Пошаговая инструкция</h2>
          {recipe.steps.map((step, index) => (
              <div key={index} className={styles.step}>
              {step.stepImage && (
              <div key={index} className={styles.stepImagediv}>
                <div className={styles.stepItemindex}>{index+1}</div>
                <Image
                  src={step.stepImage}
                  alt={`Шаг ${index + 1}`}
                  width={996}
                  height={522}
                  className={styles.stepImage}
                  objectFit="cover"
                />
              </div>
              )}
              <div>
              <h3>{step.stepTitle}</h3>
              <p className={styles.stepDescription}>{step.stepDescription}</p>
              </div>
              </div>
          ))}
          </div>
    </main>
  );
}