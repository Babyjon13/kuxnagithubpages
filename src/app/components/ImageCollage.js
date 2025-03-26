import React from 'react';
import Image from 'next/image';

const ImageCollage = ({ images }) => {
  // Заглушка, если изображений нет
  const placeholder = '/icon/lal.png'; // Укажите путь к заглушке

  // Проверяем, есть ли изображения, и добавляем заглушки при необходимости
  const imageUrls = Array(4).fill(placeholder).map((placeholder, index) => images[index] || placeholder);

  return (
    <div style={styles.container}>
      {/* Верхнее изображение */}
      <div style={styles.topImage}>
        <Image
          src={imageUrls[0]}
          alt="Top Image"
          width={995}
          height={509}
          objectFit='relative'
        />
      </div>

      {/* Нижние три изображения */}
      <div style={styles.bottomImages}>
        {imageUrls.slice(1).map((url, index) => (
          <div key={index} style={styles.bottomImage}>
            <Image
              src={url}
              alt={`Bottom Image ${index + 1}`}
              width={321}
              height={253}
              layout='cover'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    width: 'fit-content',
    gap: '10px',
  },
  topImage: {
    width: '995px',
    height: '509px',
  },
  bottomImages: {
    display: 'flex',
    gap: '16px',
  },
  bottomImage: {
    width: '321px',
    height: '253px',
    background: 'grey',
  },
};

export default ImageCollage;