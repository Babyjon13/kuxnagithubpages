import Image from "next/image"
export default function Home(){
    return(
        <div style={{ position: 'absolute', width: '300px', height: '200px', border: '1px solid #ccc' }}>
        <Image
          src='https://w7.pngwing.com/pngs/987/125/png-transparent-catgirl-anime-nekopara-kavaii-the-idolmaster-cinderella-girls-anime-girl-black-hair-manga-fictional-character-thumbnail.png'
          alt="Card Imag"
          fill
          objectFit="contain"
        />
        <div style={{ position: 'absolute', bottom: '0', background: 'rgba(0, 0, 0, 0.5)', color: 'white', width: '100%', padding: '10px' }}>
          <h3>Заголовок карточки</h3>
          <p>Описание карточки.</p>
        </div>
      </div>
    )
}