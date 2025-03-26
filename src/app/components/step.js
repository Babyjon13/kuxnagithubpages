// app/step.js
export default function Step({ id, removeComponent, handleImageUpload, image }) {
    const handleImageChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        handleImageUpload(id, "step", URL.createObjectURL(file));
      }
    };
  
    return (
      <div>
        {image && <img src={image} alt="Шаг приготовления" style={{ width: '100px', height: '100px' }} />}
        <textarea placeholder='Шаг приготовления'></textarea>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={() => removeComponent(id)} type="button">Удалить</button>
      </div>
    );
  }
  