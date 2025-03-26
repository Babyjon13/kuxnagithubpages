// pages/api/data.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { title, Portion, description, ingredients, steps } = req.body;

      // Здесь вы можете добавить логику для сохранения данных в базе данных или обработку данных
      console.log('Полученные данные:', { title, Portion, description, ingredients, steps });

      // Пример ответа сервера
      res.status(200).json({ message: 'Данные успешно получены', data: { title, Portion, description, ingredients, steps } });
    } catch (error) {
      console.error('Ошибка при обработке данных:', error);
      res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
  } else {
    console.error('Метод не разрешен');
    res.status(405).json({ message: 'Метод не разрешен' });
  }
}
