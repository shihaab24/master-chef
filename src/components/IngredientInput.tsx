import React, { useState, useRef, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { commonIngredients } from '../data/recipes';

interface IngredientInputProps {
  ingredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
  placeholder?: string;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({
  ingredients,
  onIngredientsChange,
  placeholder = "Add ingredients (e.g., chicken, rice, garlic)..."
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue.length > 0) {
      const filtered = commonIngredients
        .filter(ingredient => 
          ingredient.toLowerCase().includes(inputValue.toLowerCase()) &&
          !ingredients.includes(ingredient.toLowerCase())
        )
        .slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, ingredients]);

  const addIngredient = (ingredient: string) => {
    const normalizedIngredient = ingredient.toLowerCase().trim();
    if (normalizedIngredient && !ingredients.includes(normalizedIngredient)) {
      onIngredientsChange([...ingredients, normalizedIngredient]);
    }
    setInputValue('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const removeIngredient = (ingredient: string) => {
    onIngredientsChange(ingredients.filter(ing => ing !== ingredient));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim()) {
        addIngredient(inputValue);
      }
    } else if (e.key === 'Backspace' && !inputValue && ingredients.length > 0) {
      removeIngredient(ingredients[ingredients.length - 1]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    addIngredient(suggestion);
  };

  return (
    <div className="relative">
      <div className="space-y-3">
        {/* Ingredient Tags */}
        {ingredients.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient) => (
              <Badge 
                key={ingredient} 
                variant="secondary" 
                className="px-3 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <span className="capitalize">{ingredient}</span>
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-2 hover:text-destructive transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Input Field */}
        <div className="relative">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder={placeholder}
                className="pr-10"
              />
              <Plus className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <Button 
              onClick={() => addIngredient(inputValue)}
              disabled={!inputValue.trim()}
              size="default"
            >
              Add
            </Button>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-48 overflow-y-auto">
              <div className="p-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm capitalize"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Quick Add Common Ingredients */}
      {ingredients.length === 0 && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">Popular ingredients:</p>
          <div className="flex flex-wrap gap-2">
            {commonIngredients.slice(0, 8).map((ingredient) => (
              <Button
                key={ingredient}
                variant="outline"
                size="sm"
                onClick={() => addIngredient(ingredient)}
                className="text-xs capitalize"
              >
                {ingredient}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};