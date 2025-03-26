import styles from '@app/components/info.module.css';
import Image from 'next/image';
export default function Info({recipes}){
    return(                
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
          <p>{recipes.kkal} г.</p>
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
          <p>{recipes.bel} г.</p>
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
          <p>{recipes.fats} г.</p>
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
          <p>{recipes.carbs} г.</p>
        </div>

        <div className={styles.clock}>
          <Image
            src="/icon/clock.png"
            width={80}
            height={80}
            alt="clock"
          />
          <p>{recipes.cookingTime}</p>
        </div>
      </div>)
}