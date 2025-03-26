'use client';
import { useParams } from 'next/navigation';
import ImageSlider from "../../../components/ImageSlider";
import DayMenu from "../../../components/DayMenu";
import styles from "./page.module.css";

export default function Home() {
  const { uid } = useParams();

  const handleDeleteRecipe = (uniqueId) => {
    console.log('Recipe deleted:', uniqueId);
    // Здесь можно добавить логику для обновления состояния в родительском компоненте
  };

  const handleUpdatePortions = (uniqueId, newPortion) => {
    console.log('Portion updated:', uniqueId, newPortion);
    // Здесь можно добавить логику для обновления состояния в родительском компоненте
  };

  return (
    <>
      <ImageSlider
        images={[
          "/uploads/1742031131822_salat-muraveinik_1594970776_20_max.jpg",
          "/uploads/1742031131903_salat-muraveinik_1594970776_20_max.jpg",
          "/uploads/1742031132058_salat-muraveinik_1594970776_21_max.jpg",
          "/uploads/1742031132238_salat-muraveinik_1594970776_22_max.jpg",
          "/uploads/1742031132320_salat-muraveinik_1594970776_23_max.jpg"
        ]}
      />
      <h1>Ваше меню на день</h1>
      <main className={styles.main}>
        <DayMenu 
          uid={uid}
          onDeleteRecipe={handleDeleteRecipe}
          onUpdatePortions={handleUpdatePortions}
        />
      </main>
    </>
  );
}