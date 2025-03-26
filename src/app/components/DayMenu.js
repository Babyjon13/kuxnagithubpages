'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import styles from "./DayMenu.module.css";
import Image from "next/image";

export default function DayMenu({ uid, onDeleteRecipe, onUpdatePortions, initialRecipes = null }) {
  const [showAll, setShowAll] = useState(false);
  const [recipes, setRecipes] = useState({
    breakfasts: [],
    lunches: [],
    dinners: [],
  });
  const [portions, setPortions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);

  const MAX_RECIPES_PER_CATEGORY = 3;

  const enhanceRecipes = (data) => {
    return {
      breakfasts: (data.breakfasts || []).slice(0, MAX_RECIPES_PER_CATEGORY).map(r => ({
        ...r,
        uniqueId: `breakfast_${r.rid}_${Date.now()}_${Math.random()}`
      })),
      lunches: (data.lunches || []).slice(0, MAX_RECIPES_PER_CATEGORY).map(r => ({
        ...r,
        uniqueId: `lunch_${r.rid}_${Date.now()}_${Math.random()}`
      })),
      dinners: (data.dinners || []).slice(0, MAX_RECIPES_PER_CATEGORY).map(r => ({
        ...r,
        uniqueId: `dinner_${r.rid}_${Date.now()}_${Math.random()}`
      }))
    };
  };

  const fetchRecipes = useCallback(async () => {
    if (isLoadingRef.current || !uid) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const response = await fetch(`/api/menu/day?uid=${uid}`);
      if (!response.ok) throw new Error('Ошибка при загрузке рецептов');

      const data = await response.json();
      setRecipes(enhanceRecipes(data));

    } catch (err) {
      console.error('Error fetching recipes:', err);
      setRecipes({
        breakfasts: [],
        lunches: [],
        dinners: [],
      });
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    if (initialRecipes) {
      setRecipes(enhanceRecipes(initialRecipes));
    } else {
      fetchRecipes();
    }
  }, [fetchRecipes, initialRecipes]);

  const deleteRecipe = (uniqueId) => {
    setRecipes(prev => {
      const newRecipes = { ...prev };
      Object.keys(newRecipes).forEach(category => {
        newRecipes[category] = newRecipes[category].filter(
          recipe => recipe.uniqueId !== uniqueId
        );
      });
      return newRecipes;
    });
    
    setPortions(prev => {
      const newPortions = { ...prev };
      delete newPortions[uniqueId];
      return newPortions;
    });

    if (onDeleteRecipe) {
      onDeleteRecipe(uniqueId);
    }
  };

  const updatePortions = (uniqueId, newPortion) => {
    const updatedPortion = Math.min(Math.max(newPortion, 1), 10);
    setPortions(prev => ({
      ...prev,
      [uniqueId]: updatedPortion
    }));

    if (onUpdatePortions) {
      onUpdatePortions(uniqueId, updatedPortion);
    }
  };

  const calculateTotalNutrition = (recipes) => {
    return recipes.reduce((acc, recipe) => {
      const currentPortions = portions[recipe.uniqueId] || recipe.portion;
      const multiplier = currentPortions / recipe.portion;
      
      if (recipe.nutritionalValue) {
        acc.kkal += Math.round((recipe.nutritionalValue.kkal || 0) * multiplier);
        acc.belki += Math.round((recipe.nutritionalValue.bel || 0) * multiplier);
        acc.oily += Math.round((recipe.nutritionalValue.fats || 0) * multiplier);
        acc.carbs += Math.round((recipe.nutritionalValue.carbs || 0) * multiplier);
      }
      return acc;
    }, { kkal: 0, belki: 0, oily: 0, carbs: 0 });
  };

  const getAllIngredients = (recipes) => {
    const allIngredients = {};

    recipes.forEach((recipe) => {
      const currentPortions = portions[recipe.uniqueId] || recipe.portion;
      const multiplier = currentPortions / recipe.portion;

      recipe.ingredients?.forEach((ingredient) => {
        const key = `${ingredient.name}_${ingredient.unit}`;
        const value = ingredient.value * multiplier;
        
        if (allIngredients[key]) {
          allIngredients[key].value += value;
        } else {
          allIngredients[key] = { 
            ...ingredient,
            value: value
          };
        }
      });
    });

    return Object.values(allIngredients);
  };

  const allRecipes = [
    ...recipes.breakfasts,
    ...recipes.lunches,
    ...recipes.dinners,
  ];
  
  const totalNutrition = calculateTotalNutrition(allRecipes);
  const ArrayOfIngredients = getAllIngredients(allRecipes);
  const visibleIngredients = showAll ? ArrayOfIngredients : ArrayOfIngredients.slice(0, 26);

  const renderRecipes = (recipes, category) => {
    const elements = [];
    
    recipes.forEach((recipe) => {
      const currentPortions = portions[recipe.uniqueId] || recipe.portion;
      
      elements.push(
        <tr key={recipe.uniqueId} className={styles.tr}>
          <td className={styles.td}>
            <Image
              src={recipe.image}
              width={123}
              height={80}
              alt={recipe.title}
            />
            <p>{recipe.title}</p>
            <div className={styles.portion}>
              <button onClick={() => deleteRecipe(recipe.uniqueId)}>       
                <Image
                  src='/icon/icons8-trash-can.svg'
                  width={25}
                  height={25}
                  alt="Удалить"
                />
              </button>
              <button 
                className={styles.calc} 
                onClick={() => updatePortions(recipe.uniqueId, currentPortions - 1)}
              >
                <svg width="36" height="36" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="21" cy="21" r="19" stroke="#99CC33" strokeWidth="4"/>
                  <line x1="13" y1="20" x2="29" y2="20" stroke="#003333" strokeWidth="4"/>
                </svg>
              </button>
              <p>{currentPortions}</p>
              <button 
                className={styles.calc}
                onClick={() => updatePortions(recipe.uniqueId, currentPortions + 1)}
                disabled={currentPortions >= 10}
              >
                <svg width="36" height="36" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="21" cy="21" r="19" stroke="#99CC33" strokeWidth="4"/>
                  <line x1="13" y1="20" x2="29" y2="20" stroke="#003333" strokeWidth="4"/>
                  <line x1="21" y1="28" x2="21" y2="12" stroke="#003333" strokeWidth="4"/>
                </svg>
              </button>
            </div>
          </td>
        </tr>
      );
    });

    if (recipes.length < MAX_RECIPES_PER_CATEGORY) {
      elements.push(
        <tr key={`empty-${category}`} className={styles.tr}>
          <td className={styles.td}>
            <p>Давайте добавим рецепт</p>
          </td>
        </tr>
      );
    }

    return elements;
  };

  return (
    <div className={styles.dayMenuContainer}>
      <div className={styles.menu}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.tr}>
              <th className={styles.th}>Завтрак</th>
            </tr>
            {renderRecipes(recipes.breakfasts, 'breakfast')}

            <tr className={styles.tr}>
              <th className={styles.th}>Обед</th>
            </tr>
            {renderRecipes(recipes.lunches, 'lunch')}

            <tr className={styles.tr}>
              <th className={styles.th}>Ужин</th>
            </tr>
            {renderRecipes(recipes.dinners, 'dinner')}
          </tbody>
        </table>
      </div>
      <div className={styles.nutritionInfo}>
        <div className={styles.info}>
          <div className={styles.kkal}>
            <div className={styles.kal}>
              <Image
                src="/icon/fire.png"
                width={80}
                height={80}
                alt="kal"
              />
              <p>кaлории</p>
            </div>
            <p>{totalNutrition.kkal.toFixed(0)} г.</p>
          </div>

          <div className={styles.belki}>
            <div className={styles.bel}>
              <Image
                src="/icon/belki.png"
                width={80}
                height={80}
                alt="bel"
              />
              <p>белки</p>
            </div>
            <p>{totalNutrition.belki.toFixed(0)} г.</p>
          </div>

          <div className={styles.oily}>
            <div className={styles.oil}>
              <Image
                src="/icon/fats.png"
                width={80}
                height={80}
                alt="oil"
              />
              <p>жиры</p>
            </div>
            <p>{totalNutrition.oily.toFixed(0)} г.</p>
          </div>

          <div className={styles.carbs}>
            <div className={styles.carb}>
              <Image
                src="/icon/carbs.png"
                width={80}
                height={80}
                alt="oil"
              />
              <p>углеводы</p>
            </div>
            <p>{totalNutrition.carbs.toFixed(0)} г.</p>
          </div>
        </div>
        <div className={styles.ingredientsTable}>
          <table>
            <thead>
              <tr>
                <th className={styles.ingredientsTableHeader}>Ингредиент</th>
                <th className={styles.ingredientsTableHeader}>Количество</th>
              </tr>
            </thead>
            <tbody>
              {visibleIngredients.map((ingredient, i) => (
                <tr key={i} className={styles.ingredientsTableRow}>
                  <td className={styles.ingredientsTableCell}>{ingredient.name}</td>
                  <td className={styles.ingredientsTableCell}>
                    {ingredient.value % 1 === 0 
                      ? ingredient.value.toFixed(0) 
                      : ingredient.value.toFixed(2)
                    } {ingredient.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {ArrayOfIngredients.length > 7 && (
            <button
              className={styles.button}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Свернуть список' : 'Развернуть список'}
            </button>
          )}
        </div>
      </div>
      {isLoading && <div className={styles.loader}>Загрузка...</div>}
    </div>
  );
}