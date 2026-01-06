import { Recipe, RecipeMatch, Ingredient } from '../types/recipe';

export const normalizeIngredientName = (name: string): string => {
  return name.toLowerCase().trim()
    .replace(/s$/, '') // Remove plural 's'
    .replace(/es$/, '') // Remove plural 'es'
    .replace(/ies$/, 'y') // Handle 'ies' to 'y' (e.g., berries -> berry)
    .replace(/\s+/g, ' '); // Normalize whitespace
};

export const findIngredientMatches = (
  searchIngredients: string[],
  recipeIngredients: Ingredient[]
): { matched: string[], missing: string[] } => {
  const normalizedSearchIngredients = searchIngredients.map(normalizeIngredientName);
  const normalizedRecipeIngredients = recipeIngredients.map(ing => 
    normalizeIngredientName(ing.name)
  );

  const matched: string[] = [];
  const missing: string[] = [];

  recipeIngredients.forEach((ingredient, index) => {
    const normalizedRecipeIng = normalizedRecipeIngredients[index];
    const isMatched = normalizedSearchIngredients.some(searchIng => 
      normalizedRecipeIng.includes(searchIng) || searchIng.includes(normalizedRecipeIng)
    );

    if (isMatched) {
      matched.push(ingredient.name);
    } else if (!ingredient.optional) {
      missing.push(ingredient.name);
    }
  });

  return { matched, missing };
};

export const calculateMatchScore = (
  matched: string[],
  totalRequired: number
): number => {
  if (totalRequired === 0) return 100;
  return Math.round((matched.length / totalRequired) * 100);
};

export const searchRecipesByIngredients = (
  recipes: Recipe[],
  ingredients: string[],
  matchType: 'all' | 'some' = 'some'
): RecipeMatch[] => {
  if (!ingredients.length) return [];

  const matches: RecipeMatch[] = [];

  recipes.forEach(recipe => {
    const requiredIngredients = recipe.ingredients.filter(ing => !ing.optional);
    const { matched, missing } = findIngredientMatches(ingredients, recipe.ingredients);
    
    const matchScore = calculateMatchScore(matched, requiredIngredients.length);
    const hasCompleteMatch = missing.length === 0;
    const hasPartialMatch = matched.length > 0;

    if (matchType === 'all' && !hasCompleteMatch) return;
    if (matchType === 'some' && !hasPartialMatch) return;

    matches.push({
      recipe,
      matchScore,
      matchedIngredients: matched,
      missingIngredients: missing,
      matchType: hasCompleteMatch ? 'complete' : 'partial'
    });
  });

  return matches.sort((a, b) => b.matchScore - a.matchScore);
};

export const searchRecipesByName = (
  recipes: Recipe[],
  query: string
): Recipe[] => {
  if (!query.trim()) return [];

  const normalizedQuery = query.toLowerCase().trim();
  
  return recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(normalizedQuery) ||
    recipe.description.toLowerCase().includes(normalizedQuery) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(normalizedQuery)) ||
    recipe.cuisine.toLowerCase().includes(normalizedQuery)
  ).sort((a, b) => {
    // Prioritize exact matches in name
    const aNameMatch = a.name.toLowerCase().includes(normalizedQuery);
    const bNameMatch = b.name.toLowerCase().includes(normalizedQuery);
    
    if (aNameMatch && !bNameMatch) return -1;
    if (!aNameMatch && bNameMatch) return 1;
    
    return a.name.localeCompare(b.name);
  });
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const formatCookingTime = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`;
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) return `${hours} hr`;
  return `${hours} hr ${remainingMinutes} min`;
};

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'bg-green-100 text-green-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'hard': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};