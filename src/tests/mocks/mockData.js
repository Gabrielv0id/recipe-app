export const categoryMock = { meals: [
  { strCategory: 'Beef' },
  { strCategory: 'Breakfast' },
  { strCategory: 'Chicken' },
  { strCategory: 'Dessert' },
  { strCategory: 'Goat' },
  { strCategory: 'Lamb' },
  { strCategory: 'Miscellaneous' },
  { strCategory: 'Pasta' },
  { strCategory: 'Pork' },
  { strCategory: 'Seafood' },
  { strCategory: 'Side' },
  { strCategory: 'Starter' },
  { strCategory: 'Vegan' },
  { strCategory: 'Vegetarian' },
],
};

export const mealMock = { meals: [
  {
    idMeal: 52771,
    strMeal: 'Spicy Arrabiata Penne',
    strCategory: 'Vegetarian',
    strInstructions: 'Bring a large pot of lightly salted water to a boil. Add pasta and cook for 8 to 10 minutes or until al dente; drain. Heat oil in a skillet over medium heat. Cook and stir garlic in the hot oil until fragrant, about 30 seconds. Stir in crushed red pepper flakes, tomatoes, tomato paste, and sugar; season with salt and pepper. Bring to a simmer, reduce heat to medium-low, and simmer until sauce is slightly thickened, about 10 minutes. Stir in cooked pasta and basil; cook until basil is wilted, about 1 minute. Sprinkle with Parmesan cheese to serve.',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=1IszT_guI08',
    strIngredient1: 'penne rigate',
    strIngredient2: 'olive oil',
    strIngredient3: 'garlic',
    strMeasure1: '1 pound',
    strMeasure2: '1/4 cup',
    strMeasure3: '3 cloves',
    ingredients: ['penne rigate', 'olive oil', 'garlic'],
    measures: ['1 pound', '1/4 cup', '3 cloves'],
  },
  {
    idMeal: 52802,
    strMeal: 'Spicy Seafood Pasta',
    strCategory: 'Seafood',
    strInstructions: '01.Put the potatoes in a large pan of cold salted water and bring to the boil. Lower the heat, cover, then simmer gently for 15 minutes until tender. Drain, then return to the pan over a low heat for 30 seconds to drive off any excess water. Mash with 1 tbsp olive oil, then season.\r\n02.Meanwhile put the milk in a large sauté pan, add the fish and bring to the boil. Remove from the heat, cover and stand for 3 minutes. Remove the fish (reserving the milk) and pat dry with kitchen paper, then gently flake into an ovenproof dish, discarding the skin and any bones.\r\n03.Heat the remaining oil in a pan, stir in the flour and cook for 30 seconds. Gradually stir in 200-250ml of the reserved milk (discard the rest). Grate in nutmeg, season, then bubble until thick. Stir in the cream.\r\n04.Preheat the oven to 190°C/fan170°C/gas 5. Grate the artichokes and add to the dish with the leek, prawns and herbs. Stir the lemon zest and juice into the sauce, then pour over. Mix gently with a wooden spoon.\r\n05.Spoon the mash onto the fish mixture, then use a fork to make peaks, which will crisp and brown as it cooks. Sprinkle over the cheese, then bake for 35-40 minutes until golden and bubbling. Serve with wilted greens.',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1529446329.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=1IszT_guI08',
    strIngredient1: 'floury potatoes',
    strIngredient2: 'olive oil',
    strIngredient3: 'nutmeg',
    strMeasure1: '900g',
    strMeasure2: '2 tbsp',
    strMeasure3: 'grating',
    ingredients: ['floury potatoes', 'olive oil', 'nutmeg'],
    measures: ['900g', '2 tbsp', 'grating'],
  },
] };

export const drinkMock = { drinks: [
  {
    idDrink: 11007,
    strDrink: 'Margarita',
    strInstructions: 'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
    strIngredient1: 'Tequila',
    strIngredient2: 'Triple sec',
    strIngredient3: 'Lime juice',
    strIngredient4: 'Salt',
    strMeasure1: '1 1/2 oz ',
    strMeasure2: '1/2 oz ',
    strMeasure3: '1 oz ',
    strMeasure4: null,
    ingredients: ['Tequila', 'Triple sec', 'Lime juice', 'Salt'],
    measures: ['1 1/2 oz ', '1/2 oz ', '1 oz ', null],
  },
  {
    idDrink: 11008,
    strDrink: 'Aquamarine',
    strInstructions: 'Shake all ingredients (except nutmeg) with ice and strain into a cocktail glass. Sprinkle nutmeg on top and serve.',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/loezxn1504373874.jpg',
    strIngredient1: 'Gin',
    strIngredient2: 'Blue Curacao',
    strIngredient3: 'Lemon juice',
    strIngredient4: 'Powdered sugar',
    strIngredient5: 'Nutmeg',
    strMeasure1: '1 1/2 oz ',
    strMeasure2: '1 oz ',
    strMeasure3: '1/2 oz ',
    strMeasure4: '1 tsp ',
    strMeasure5: '1/4 tsp ',
    ingredients: ['Gin', 'Blue Curacao', 'Lemon juice', 'Powdered sugar', 'Nutmeg'],
    measures: ['1 1/2 oz ', '1 oz ', '1/2 oz ', '1 tsp ', '1/4 tsp '],
  },
] };

export const mealErrorMock = [];

export const favoriteMock = [
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
];
