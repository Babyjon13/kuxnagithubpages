import { NextResponse } from 'next/server';
import recipeData from '@/data/kuxnarecipes.json';

export async function GET(request, { params }) {
  const { rid } = params; // Получаем rid из параметров запроса

  try {
    // Ищем рецепт по rid
    console.log(rid);
    const recipe = recipeData.find((recipe) => recipe.id.$oid == rid);

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    // Форматируем данные для ответа
    const response = {
      bid: recipe.id.$oid,
      title: recipe.title,
      portion: recipe.portion,
      description: recipe.description,
      cookingTime: recipe.cookingTime,
      kkal: recipe.nutritionalValue.kkal,
      bel: recipe.nutritionalValue.bel,
      fats: recipe.nutritionalValue.fats,
      carbs: recipe.nutritionalValue.carbs,
      images: recipe.images,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return NextResponse.json({ error: 'Failed to fetch recipe' }, { status: 500 });
  }
}
