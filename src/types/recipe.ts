export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  cookingTime: number;
  prepTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  image?: string;
  tags: string[];
}

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
  optional?: boolean;
}

export interface RecipeMatch {
  recipe: Recipe;
  matchScore: number;
  matchedIngredients: string[];
  missingIngredients: string[];
  matchType: 'complete' | 'partial';
}

export interface SearchFilters {
  matchType: 'all' | 'some';
  cuisine?: string;
  difficulty?: string;
  maxCookingTime?: number;
}