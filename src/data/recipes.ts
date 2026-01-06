import { Recipe } from '../types/recipe';

export const sampleRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Classic Spaghetti Carbonara',
    description: 'Creamy Italian pasta dish with eggs, cheese, and pancetta',
    ingredients: [
      { name: 'spaghetti', amount: '400', unit: 'g' },
      { name: 'eggs', amount: '4', unit: 'large' },
      { name: 'pancetta', amount: '200', unit: 'g' },
      { name: 'parmesan cheese', amount: '100', unit: 'g' },
      { name: 'black pepper', amount: '1', unit: 'tsp' },
      { name: 'salt', amount: 'to', unit: 'taste' }
    ],
    instructions: [
      'Bring a large pot of salted water to boil and cook spaghetti according to package directions.',
      'While pasta cooks, heat a large skillet over medium heat. Add pancetta and cook until crispy.',
      'In a bowl, whisk together eggs, grated parmesan, and black pepper.',
      'Drain pasta, reserving 1 cup of pasta water.',
      'Add hot pasta to the skillet with pancetta.',
      'Remove from heat and quickly stir in egg mixture, adding pasta water as needed.',
      'Serve immediately with extra parmesan and black pepper.'
    ],
    cookingTime: 20,
    prepTime: 10,
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'Italian',
    tags: ['pasta', 'quick', 'creamy']
  },
  {
    id: '2',
    name: 'Chicken Fried Rice',
    description: 'Quick and flavorful fried rice with chicken and vegetables',
    ingredients: [
      { name: 'rice', amount: '2', unit: 'cups cooked' },
      { name: 'chicken breast', amount: '300', unit: 'g' },
      { name: 'eggs', amount: '2', unit: 'large' },
      { name: 'soy sauce', amount: '3', unit: 'tbsp' },
      { name: 'garlic', amount: '3', unit: 'cloves' },
      { name: 'green onions', amount: '3', unit: 'stalks' },
      { name: 'frozen peas', amount: '1', unit: 'cup' },
      { name: 'sesame oil', amount: '1', unit: 'tbsp' }
    ],
    instructions: [
      'Cook rice and let it cool completely (preferably day-old rice).',
      'Cut chicken into small cubes and season with salt and pepper.',
      'Heat oil in a large wok or skillet over high heat.',
      'Cook chicken until golden and cooked through, remove and set aside.',
      'Scramble eggs in the same pan, remove and set aside.',
      'Add more oil, then add garlic and cook for 30 seconds.',
      'Add rice, breaking up any clumps, and stir-fry for 3-4 minutes.',
      'Return chicken and eggs to pan, add peas, soy sauce, and sesame oil.',
      'Stir-fry for 2 more minutes, garnish with green onions and serve.'
    ],
    cookingTime: 15,
    prepTime: 15,
    servings: 4,
    difficulty: 'Easy',
    cuisine: 'Asian',
    tags: ['rice', 'chicken', 'quick', 'leftover-friendly']
  },
  {
    id: '3',
    name: 'Margherita Pizza',
    description: 'Classic Italian pizza with fresh tomatoes, mozzarella, and basil',
    ingredients: [
      { name: 'pizza dough', amount: '1', unit: 'ball' },
      { name: 'tomato sauce', amount: '1/2', unit: 'cup' },
      { name: 'mozzarella cheese', amount: '200', unit: 'g' },
      { name: 'fresh basil', amount: '1/4', unit: 'cup' },
      { name: 'olive oil', amount: '2', unit: 'tbsp' },
      { name: 'salt', amount: 'to', unit: 'taste' },
      { name: 'black pepper', amount: 'to', unit: 'taste' }
    ],
    instructions: [
      'Preheat oven to 475°F (245°C).',
      'Roll out pizza dough on a floured surface to desired thickness.',
      'Transfer dough to a pizza stone or baking sheet.',
      'Spread tomato sauce evenly over the dough, leaving a border for crust.',
      'Tear mozzarella into chunks and distribute over sauce.',
      'Drizzle with olive oil and season with salt and pepper.',
      'Bake for 10-12 minutes until crust is golden and cheese is bubbly.',
      'Remove from oven and immediately top with fresh basil leaves.',
      'Let cool for 2-3 minutes before slicing and serving.'
    ],
    cookingTime: 12,
    prepTime: 20,
    servings: 2,
    difficulty: 'Medium',
    cuisine: 'Italian',
    tags: ['pizza', 'vegetarian', 'classic']
  },
  {
    id: '4',
    name: 'Beef Tacos',
    description: 'Seasoned ground beef tacos with fresh toppings',
    ingredients: [
      { name: 'ground beef', amount: '500', unit: 'g' },
      { name: 'taco shells', amount: '8', unit: 'pieces' },
      { name: 'onion', amount: '1', unit: 'medium' },
      { name: 'garlic', amount: '2', unit: 'cloves' },
      { name: 'cumin', amount: '1', unit: 'tsp' },
      { name: 'paprika', amount: '1', unit: 'tsp' },
      { name: 'lettuce', amount: '2', unit: 'cups shredded' },
      { name: 'tomatoes', amount: '2', unit: 'medium' },
      { name: 'cheese', amount: '1', unit: 'cup grated' },
      { name: 'sour cream', amount: '1/2', unit: 'cup', optional: true }
    ],
    instructions: [
      'Heat taco shells in oven according to package directions.',
      'Dice onion and mince garlic.',
      'Heat oil in a large skillet over medium-high heat.',
      'Cook onion until softened, about 3 minutes.',
      'Add garlic and cook for another minute.',
      'Add ground beef, breaking it up with a spoon.',
      'Cook until beef is browned, about 6-8 minutes.',
      'Add cumin, paprika, salt, and pepper. Cook for 2 more minutes.',
      'Dice tomatoes and shred lettuce.',
      'Fill taco shells with beef mixture and top with lettuce, tomatoes, cheese, and sour cream.'
    ],
    cookingTime: 15,
    prepTime: 15,
    servings: 4,
    difficulty: 'Easy',
    cuisine: 'Mexican',
    tags: ['tacos', 'beef', 'quick', 'family-friendly']
  },
  {
    id: '5',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with classic Caesar dressing and croutons',
    ingredients: [
      { name: 'romaine lettuce', amount: '2', unit: 'heads' },
      { name: 'parmesan cheese', amount: '1/2', unit: 'cup grated' },
      { name: 'bread', amount: '4', unit: 'slices' },
      { name: 'mayonnaise', amount: '1/2', unit: 'cup' },
      { name: 'lemon juice', amount: '2', unit: 'tbsp' },
      { name: 'garlic', amount: '2', unit: 'cloves' },
      { name: 'anchovy paste', amount: '1', unit: 'tsp', optional: true },
      { name: 'olive oil', amount: '3', unit: 'tbsp' }
    ],
    instructions: [
      'Wash and dry romaine lettuce thoroughly. Chop into bite-sized pieces.',
      'Cut bread into cubes for croutons.',
      'Heat 2 tbsp olive oil in a pan and toast bread cubes until golden.',
      'For dressing, mince garlic and mix with mayonnaise, lemon juice, and anchovy paste.',
      'Gradually whisk in remaining olive oil.',
      'Toss lettuce with dressing until well coated.',
      'Top with croutons and grated parmesan cheese.',
      'Serve immediately while croutons are still crispy.'
    ],
    cookingTime: 10,
    prepTime: 15,
    servings: 4,
    difficulty: 'Easy',
    cuisine: 'American',
    tags: ['salad', 'vegetarian', 'classic', 'healthy']
  },
  {
    id: '6',
    name: 'Chocolate Chip Cookies',
    description: 'Soft and chewy homemade chocolate chip cookies',
    ingredients: [
      { name: 'flour', amount: '2 1/4', unit: 'cups' },
      { name: 'butter', amount: '1', unit: 'cup softened' },
      { name: 'brown sugar', amount: '3/4', unit: 'cup' },
      { name: 'white sugar', amount: '1/4', unit: 'cup' },
      { name: 'eggs', amount: '2', unit: 'large' },
      { name: 'vanilla extract', amount: '2', unit: 'tsp' },
      { name: 'baking soda', amount: '1', unit: 'tsp' },
      { name: 'salt', amount: '1', unit: 'tsp' },
      { name: 'chocolate chips', amount: '2', unit: 'cups' }
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'In a large bowl, cream together softened butter and both sugars.',
      'Beat in eggs one at a time, then add vanilla extract.',
      'In separate bowl, whisk together flour, baking soda, and salt.',
      'Gradually mix dry ingredients into wet ingredients.',
      'Fold in chocolate chips.',
      'Drop rounded tablespoons of dough onto ungreased baking sheets.',
      'Bake for 9-11 minutes until edges are golden but centers still soft.',
      'Cool on baking sheet for 5 minutes before transferring to wire rack.'
    ],
    cookingTime: 11,
    prepTime: 15,
    servings: 36,
    difficulty: 'Easy',
    cuisine: 'American',
    tags: ['dessert', 'cookies', 'sweet', 'baking']
  }
];

export const commonIngredients = [
  'eggs', 'flour', 'butter', 'sugar', 'salt', 'pepper', 'garlic', 'onion',
  'olive oil', 'tomatoes', 'cheese', 'chicken', 'beef', 'rice', 'pasta',
  'bread', 'milk', 'lemon', 'herbs', 'spices', 'vegetables', 'lettuce',
  'carrots', 'potatoes', 'bell peppers', 'mushrooms', 'spinach', 'broccoli',
  'soy sauce', 'vinegar', 'honey', 'ginger', 'basil', 'oregano', 'thyme',
  'parsley', 'cilantro', 'lime', 'avocado', 'corn', 'beans', 'nuts'
];