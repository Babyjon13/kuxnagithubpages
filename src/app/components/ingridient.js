// app/ingridient.js
export default function Ing({ id, removeComponent }) {
    return (
      <div>
        <input placeholder='Инг'/><br/>
        <input placeholder='кол'/>
        <select>
          <option>Без группы</option>
        </select>
        <button onClick={() => removeComponent(id)} type="button">Удалить</button>
      </div>
    );
  }
  