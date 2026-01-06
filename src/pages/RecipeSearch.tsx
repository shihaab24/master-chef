import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChefHat, Utensils } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { IngredientInput } from '../components/IngredientInput';
import { RecipeCard } from '../components/RecipeCard';
import { SearchFilters } from '../components/SearchFilters';
import { sampleRecipes } from '../data/recipes';
import { Recipe, RecipeMatch, SearchFilters as SearchFiltersType } from '../types/recipe';
import { searchRecipesByIngredients, searchRecipesByName, debounce } from '../utils/recipeUtils';
import { useNavigate } from 'react-router-dom';

export const RecipeSearch: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'name'>('ingredients');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [nameQuery, setNameQuery] = useState('');
  const [filters, setFilters] = useState<SearchFiltersType>({ matchType: 'some' });
  const [searchCache, setSearchCache] = useState<Map<string, Recipe[] | RecipeMatch[]>>(new Map());
  
  const navigate = useNavigate();

  // Debounced search functions
  const debouncedIngredientSearch = useMemo(
    () => debounce((ingredients: string[]) => {
      if (ingredients.length > 0) {
        const cacheKey = `ingredients:${ingredients.join(',')}:${filters.matchType}`;
        if (!searchCache.has(cacheKey)) {
          const results = searchRecipesByIngredients(sampleRecipes, ingredients, filters.matchType);
          setSearchCache(prev => new Map(prev).set(cacheKey, results));
        }
      }
    }, 300),
    [filters.matchType, searchCache]
  );

  const debouncedNameSearch = useMemo(
    () => debounce((query: string) => {
      if (query.trim()) {
        const cacheKey = `name:${query}`;
        if (!searchCache.has(cacheKey)) {
          const results = searchRecipesByName(sampleRecipes, query);
          setSearchCache(prev => new Map(prev).set(cacheKey, results));
        }
      }
    }, 300),
    [searchCache]
  );

  // Effect for ingredient search
  useEffect(() => {
    if (activeTab === 'ingredients') {
      debouncedIngredientSearch(ingredients);
    }
  }, [ingredients, filters.matchType, activeTab, debouncedIngredientSearch]);

  // Effect for name search
  useEffect(() => {
    if (activeTab === 'name') {
      debouncedNameSearch(nameQuery);
    }
  }, [nameQuery, activeTab, debouncedNameSearch]);

  // Get search results from cache
  const getSearchResults = (): Recipe[] | RecipeMatch[] => {
    if (activeTab === 'ingredients' && ingredients.length > 0) {
      const cacheKey = `ingredients:${ingredients.join(',')}:${filters.matchType}`;
      return searchCache.get(cacheKey) || searchRecipesByIngredients(sampleRecipes, ingredients, filters.matchType);
    }
    
    if (activeTab === 'name' && nameQuery.trim()) {
      const cacheKey = `name:${nameQuery}`;
      return searchCache.get(cacheKey) || searchRecipesByName(sampleRecipes, nameQuery);
    }

    return [];
  };

  const searchResults = getSearchResults();
  const hasActiveSearch = (activeTab === 'ingredients' && ingredients.length > 0) || 
                         (activeTab === 'name' && nameQuery.trim().length > 0);

  const handleRecipeClick = (recipe: Recipe) => {
    navigate(`/recipe/${recipe.id}`, { 
      state: { 
        recipe,
        searchType: activeTab,
        searchIngredients: activeTab === 'ingredients' ? ingredients : undefined,
        searchQuery: activeTab === 'name' ? nameQuery : undefined
      }
    });
  };

  const renderSearchResults = () => {
    if (!hasActiveSearch) {
      return (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              {activeTab === 'ingredients' ? (
                <Utensils className="w-16 h-16 mx-auto text-muted-foreground/50" />
              ) : (
                <Search className="w-16 h-16 mx-auto text-muted-foreground/50" />
              )}
            </div>
            <h3 className="text-lg font-medium mb-2">
              {activeTab === 'ingredients' 
                ? 'Add ingredients to find recipes'
                : 'Search for recipes by name'
              }
            </h3>
            <p className="text-muted-foreground">
              {activeTab === 'ingredients'
                ? 'Start by adding ingredients you have available, and we\'ll show you recipes you can make.'
                : 'Enter a recipe name, cuisine type, or ingredient to find specific recipes.'
              }
            </p>
          </div>
        </div>
      );
    }

    if (searchResults.length === 0) {
      return (
        <div className="text-center py-12">
          <Search className="w-16 h-16 mx-auto text-muted-foreground/50 mb-6" />
          <h3 className="text-lg font-medium mb-2">No recipes found</h3>
          <p className="text-muted-foreground">
            {activeTab === 'ingredients'
              ? 'Try adding different ingredients or changing your match requirements.'
              : 'Try a different search term or check your spelling.'
            }
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((result) => {
          const recipe = 'recipe' in result ? result.recipe : result;
          const match = 'recipe' in result ? result : undefined;
          
          return (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              match={match}
              onClick={() => handleRecipeClick(recipe)}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Recipe Finder</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Discover delicious recipes based on your available ingredients or search by name
          </p>
        </div>

        {/* Search Interface */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Find Your Perfect Recipe</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'ingredients' | 'name')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ingredients" className="flex items-center gap-2">
                  <Utensils className="w-4 h-4" />
                  By Ingredients
                </TabsTrigger>
                <TabsTrigger value="name" className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  By Name
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="ingredients" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">What ingredients do you have?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add ingredients you have available, and we'll find recipes you can make.
                    </p>
                  </div>
                  <IngredientInput
                    ingredients={ingredients}
                    onIngredientsChange={setIngredients}
                    placeholder="Add ingredients (e.g., chicken, rice, garlic)..."
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="name" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Search for a specific recipe</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Enter recipe names, cuisine types, or specific dishes you're looking for.
                    </p>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      value={nameQuery}
                      onChange={(e) => setNameQuery(e.target.value)}
                      placeholder="Search recipes (e.g., 'pasta carbonara', 'chicken', 'italian')..."
                      className="pl-10"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Search Filters */}
        {activeTab === 'ingredients' && (
          <SearchFilters
            filters={filters}
            onFiltersChange={setFilters}
            resultCount={searchResults.length}
            hasActiveSearch={hasActiveSearch}
          />
        )}

        {/* Search Results */}
        <div className="min-h-[400px]">
          {renderSearchResults()}
        </div>
      </div>
    </div>
  );
};