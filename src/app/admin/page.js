// app/page.js
'use client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from "./page.module.css";
import Ing from '../components/ingridient';
import Step from '../components/step';

export default function HomePage() {
  const [title, setTitle] = useState('');
  const [Portion, setPortion] = useState(1);
  const [description, setDescription] = useState('');
  const [response, setResponse] = useState(null);
  const [ingredients, setIngredients] = useState([{ id: uuidv4() }]);
  const [steps, setSteps] = useState([{ id: uuidv4(), image: null }]);

  const handleAddIngredient = () => {
    const newId = uuidv4();
    setIngredients([...ingredients, { id: newId }]);
  };

  const removeIngredient = (id) => {
    setIngredients(ingredients.filter((item) => item.id !== id));
  };

  const handleAddStep = () => {
    const newId = uuidv4();
    setSteps([...steps, { id: newId, image: null }]);
  };

  const removeStep = (id) => {
    setSteps(steps.filter((item) => item.id !== id));
  };

  const handleImageUpload = (id, type, image) => {
    if (type === "step") {
      setSteps(steps.map(item => item.id === id ? { ...item, image } : item));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      title,
      Portion: Number(Portion),
      description,
      ingredients,
      steps,
    };

    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) {
        const errorDetails = await res.text(); // Попробуем получить ответ как текст
        throw new Error(`Network response was not ok: ${errorDetails}`);
      }

      const data = await res.json();
      setResponse(data);

      // Сохранение данных на устройстве
      const blob = new Blob([JSON.stringify(dataToSend, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'recipe.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
      setResponse({ message: `Ошибка при отправке данных: ${error.message}` });
    }
  };

  return (
    <div className={styles.div}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Заголовок</h1>
        <input
          type='text'
          value={title}
          title='Заголовок'
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2>Описание рецепта</h2>
        <textarea
          type="text"
          title='Подзаголовок'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Введите краткое описание рецепта:"
          required
        />
        <h2>Кол порций</h2>
        <input
          type='number'
          value={Portion}
          placeholder='кол. порций'
          onChange={(e) => setPortion(e.target.value)}
        />
        
        <div>
          <h3>Ингредиенты:</h3>
          <ol>
          {ingredients.map((item,ind) => (
              <li key={ind}><Ing key={item.id} id={item.id} removeComponent={removeIngredient} /></li>
              
            ))}
            </ol>
          <button onClick={handleAddIngredient} type="button">Добавить ингредиент</button>
        </div>
        
        <div>
          <h3>Шаги приготовления:</h3>
          <ol>
          {steps.map((item,index) => (
            <li key={index}><Step key={item.id} id={item.id} removeComponent={removeStep} handleImageUpload={handleImageUpload} image={item.image} /></li>
          ))}
          </ol>
          <button onClick={handleAddStep} type="button">Добавить шаг</button>
        </div>

        <button type="submit">Submit</button>
      </form>
      {response && <div>Ответ: {JSON.stringify(response)}</div>}
    </div>
  );
}
