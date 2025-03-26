import { NextResponse } from 'next/server';
import dataUser from '@app/dataUser.json';
import data from '@app/recipes.json';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const uid = url.searchParams.get('uid');

    // Логирование для отладки
    console.log('Received UID:', uid);
    console.log('Users data:', dataUser);
    console.log('Recipes data:', data);

    // Поиск пользователя по uid
    const user = dataUser.find(user => user._id.$oid === uid);

    if (!user) {
      console.error('User not found for UID:', uid);
      return NextResponse.json(
        { error: 'User not found' }, 
        { status: 404 }
      );
    }

    console.log('Found user:', user);

    const { breakfasts, lunches, dinners } = user.recipes;

    // Функция для получения рецептов по rid
    const getRecipesData = (rids) => {
      if (!rids || rids.length === 0) {
        console.log('No RIDs provided, returning empty array');
        return [];
      }
      const recipes = data.filter(recipe => 
        rids.includes(recipe._id.$oid) // Используем $oid для сравнения
      );
      console.log('Found recipes:', recipes);
      return recipes;
    };

    // Получаем данные для каждого типа рецептов
    const breakfastRecipes = getRecipesData(breakfasts);
    const lunchRecipes = getRecipesData(lunches);
    const dinnerRecipes = getRecipesData(dinners);

    // Функция для извлечения необходимых данных из рецепта
    const extractRecipeData = (recipes) => {
      return recipes.map(recipe => ({
        rid: recipe._id.$oid, // Используем $oid
        title: recipe.title,
        image: recipe.images[0],
        ingredients: recipe.ingredients,
        portion: recipe.portion,
        nutritionalValue: recipe.nutritionalValue
      }));
    };

    // Создаем объект ответа
    const response = {
      breakfasts: extractRecipeData(breakfastRecipes),
      lunches: extractRecipeData(lunchRecipes),
      dinners: extractRecipeData(dinnerRecipes)
    };

    console.log('Response:', response);

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Error fetching user recipes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user recipes' }, 
      { status: 500 }
    );
  }
}