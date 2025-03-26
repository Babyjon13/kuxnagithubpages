'use client'
import { useState } from "react";

export default function Ingredients({ingredients}){

let [count, setCount] = useState(ingredients.portion);
    
function PlusClick(){
  setCount(prevCount => Number(prevCount) + 1);
}

function MinusClick(){
  setCount(prevCount => Number(prevCount) - 1);
}

function handleInputChange(event) {
  const value = Number(event.target.value);
  setCount(value);
}
function multiplyNumbersInString(str, multiplier) {
  // Используем регулярное выражение для поиска всех чисел в строке
  return str.replace(/(\d+)/g, (match) => {
    // Умножаем найденное число на multiplier
    const num = parseInt(match);
    return num*multiplier;
  });
}
return(
    <div>
          <h1>Ингредиенты: </h1>
          <span>
            <button onClick={MinusClick} disabled = {count<=1}>-</button>
            <input type="number" value={count} onChange={multiplyNumbersInString}></input>
            <button onClick={PlusClick} disabled= {count>=10}>+</button>
          </span>
          <ul>
          {Object.entries(ingredients.ingredients).map((name,index) => (
            <li key={index}>
              {ingredients.ingredients[index].name} : {ingredients.ingredients[index].value === '0' ? '-' : ingredients.ingredients[index].value.length>1 ? multiplyNumbersInString(ingredients.ingredients[index].value,count) : ingredients.ingredients[index].value*count} {ingredients.ingredients[index].unit}
            </li>
          ))}
          </ul>

        </div>
)
}



