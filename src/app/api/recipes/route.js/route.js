import { NextResponse } from 'next/server';
import recipeData from "@/data/kuxnarecipes.json";

export async function GET() {
  try {
    let response = recipeData.map((recipe) => ({
      rid: recipe.id.$oid,
      title: recipe.title,
      description: recipe.description,
      cookingTime: recipe.cookingTime,
      kkal: recipe.nutritionalValue.kkal,
      bel: recipe.nutritionalValue.bel,
      fats: recipe.nutritionalValue.fats,
      carbs: recipe.nutritionalValue.carbs,
      images: recipe.images,
      categorieKkal:recipe.categories[0].categoryKkal,
      categorieTime: recipe.categories[0].categoryTime,
      category: recipe.categories[0].category,
    }));


    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}