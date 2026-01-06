import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { SearchFilters as SearchFiltersType } from '../types/recipe';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  resultCount: number;
  hasActiveSearch: boolean;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  resultCount,
  hasActiveSearch
}) => {
  const handleMatchTypeChange = (matchType: 'all' | 'some') => {
    onFiltersChange({ ...filters, matchType });
  };

  const clearFilters = () => {
    onFiltersChange({ matchType: 'some' });
  };

  const hasActiveFilters = filters.matchType !== 'some' || filters.cuisine || filters.difficulty || filters.maxCookingTime;

  if (!hasActiveSearch) return null;

  return (
    <Card className="mb-6">
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filters</span>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs"
              >
                Clear all
              </Button>
            )}
          </div>
          <Badge variant="outline" className="text-xs">
            {resultCount} recipes found
          </Badge>
        </div>

        {/* Match Type Filter */}
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-2">Ingredient Match</p>
            <div className="flex gap-2">
              <Button
                variant={filters.matchType === 'some' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleMatchTypeChange('some')}
                className="text-xs"
              >
                Some ingredients
              </Button>
              <Button
                variant={filters.matchType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleMatchTypeChange('all')}
                className="text-xs"
              >
                All ingredients
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};