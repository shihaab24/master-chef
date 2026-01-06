import React from 'react';
import { Clock, Users, ChefHat, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Recipe, RecipeMatch } from '../types/recipe';
import { formatCookingTime, getDifficultyColor } from '../utils/recipeUtils';

interface RecipeCardProps {
  recipe: Recipe;
  match?: RecipeMatch;
  onClick: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, match, onClick }) => {
  const totalTime = recipe.prepTime + recipe.cookingTime;

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer group" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-3">
          <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {recipe.name}
          </CardTitle>
          {match && (
            <div className="flex-shrink-0">
              {match.matchType === 'complete' ? (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {match.matchScore}%
                </Badge>
              ) : (
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {match.matchScore}%
                </Badge>
              )}
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
      </CardHeader>

      <CardContent className="pb-3">
        {/* Recipe Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{formatCookingTime(totalTime)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="w-4 h-4" />
            <Badge variant="outline" className={`text-xs ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty}
            </Badge>
          </div>
        </div>

        {/* Ingredient Match Information */}
        {match && (
          <div className="space-y-2">
            {match.matchedIngredients.length > 0 && (
              <div>
                <p className="text-xs font-medium text-green-700 mb-1">
                  You have ({match.matchedIngredients.length}):
                </p>
                <div className="flex flex-wrap gap-1">
                  {match.matchedIngredients.slice(0, 4).map((ingredient) => (
                    <Badge key={ingredient} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      {ingredient}
                    </Badge>
                  ))}
                  {match.matchedIngredients.length > 4 && (
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      +{match.matchedIngredients.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {match.missingIngredients.length > 0 && (
              <div>
                <p className="text-xs font-medium text-orange-700 mb-1">
                  Need ({match.missingIngredients.length}):
                </p>
                <div className="flex flex-wrap gap-1">
                  {match.missingIngredients.slice(0, 3).map((ingredient) => (
                    <Badge key={ingredient} variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                      {ingredient}
                    </Badge>
                  ))}
                  {match.missingIngredients.length > 3 && (
                    <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                      +{match.missingIngredients.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Recipe Tags */}
        {!match && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          View Recipe
        </Button>
      </CardFooter>
    </Card>
  );
};