import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, ChefHat, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Recipe } from '../types/recipe';
import { sampleRecipes } from '../data/recipes';
import { formatCookingTime, getDifficultyColor } from '../utils/recipeUtils';

export const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Get recipe from location state or find by ID
  const recipe: Recipe | undefined = location.state?.recipe || 
    sampleRecipes.find(r => r.id === id);

  // Get search context if available
  const searchIngredients: string[] = location.state?.searchIngredients || [];
  const searchType: string = location.state?.searchType || '';

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Recipe not found</h1>
          <Button onClick={() => navigate('/')}>
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  const totalTime = recipe.prepTime + recipe.cookingTime;

  // Determine ingredient availability if coming from ingredient search
  const getIngredientStatus = (ingredientName: string) => {
    if (searchType === 'ingredients' && searchIngredients.length > 0) {
      const hasIngredient = searchIngredients.some(searchIng => 
        ingredientName.toLowerCase().includes(searchIng.toLowerCase()) ||
        searchIng.toLowerCase().includes(ingredientName.toLowerCase())
      );
      return hasIngredient ? 'available' : 'needed';
    }
    return 'neutral';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>

        {/* Recipe Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-3">{recipe.name}</h1>
              <p className="text-lg text-muted-foreground">{recipe.description}</p>
            </div>

            {/* Recipe Stats */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <div className="text-sm">
                  <span className="font-medium text-foreground">{formatCookingTime(totalTime)}</span>
                  <span className="text-xs block">
                    Prep: {recipe.prepTime}min, Cook: {recipe.cookingTime}min
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <div className="text-sm">
                  <span className="font-medium text-foreground">{recipe.servings}</span>
                  <span className="text-xs block">servings</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5" />
                <Badge className={`${getDifficultyColor(recipe.difficulty)}`}>
                  {recipe.difficulty}
                </Badge>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {recipe.cuisine}
              </Badge>
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Ingredients
                  {searchType === 'ingredients' && searchIngredients.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      Match view
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => {
                    const status = getIngredientStatus(ingredient.name);
                    
                    return (
                      <div
                        key={index}
                        className={`flex items-start justify-between p-3 rounded-lg border transition-colors ${
                          status === 'available' ? 'bg-green-50 border-green-200' :
                          status === 'needed' ? 'bg-orange-50 border-orange-200' :
                          'bg-muted/30'
                        }`}
                      >
                        <div className="flex items-start gap-2 flex-1">
                          {status === 'available' && (
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          )}
                          {status === 'needed' && (
                            <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <span className={`capitalize ${
                              status === 'available' ? 'text-green-800' :
                              status === 'needed' ? 'text-orange-800' :
                              'text-foreground'
                            }`}>
                              {ingredient.name}
                            </span>
                            {ingredient.optional && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                optional
                              </Badge>
                            )}
                          </div>
                        </div>
                        <span className={`text-sm font-medium ${
                          status === 'available' ? 'text-green-800' :
                          status === 'needed' ? 'text-orange-800' :
                          'text-muted-foreground'
                        }`}>
                          {ingredient.amount} {ingredient.unit}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {searchType === 'ingredients' && searchIngredients.length > 0 && (
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3 inline mr-1" />
                      Available ingredients
                      <AlertCircle className="w-3 h-3 inline mr-1 ml-3" />
                      Need to buy
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{instruction}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* Cooking Tips */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">💡 Cooking Tips</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Read through all instructions before starting</li>
                    <li>• Prepare and measure all ingredients beforehand</li>
                    <li>• Taste and adjust seasoning as needed</li>
                    {recipe.difficulty === 'Hard' && (
                      <li>• Take your time with each step for best results</li>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};