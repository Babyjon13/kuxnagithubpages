import ImageSlider from "@/app/components/ImageSlider";
import styles from "./page.module.css"
export default function week(){

    return(
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
        <main className={styles.main}>
        <div className={styles.week}>
            <p>неделя 1</p>
        </div>
        <div className={styles.day}>
            <p>День 1</p>
        </div>
        <div className={styles.day}>
            <p>День 2</p>
        </div>
        <div className={styles.day}>
            <p>День 3</p>
        </div>
        <div className={styles.day}>
            <p>День 4</p>
        </div>
        <div className={styles.day}>
            <p>День 5</p>
        </div>
        <div className={styles.day}>
            <p>День 6</p>
        </div>
        <div className={styles.day}>
            <p>День 7</p>
        </div>
        </main>
    </>
)}