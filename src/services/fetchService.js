export const handleFetch = async (type, filter, search) => {
  let url;
  // Montagem da URL de acordo com o tipo de busca
  if (type === 'meals') url = 'https://www.themealdb.com/api/json/v1/1/';
  if (type === 'drinks') url = 'https://www.thecocktaildb.com/api/json/v1/1/';
  if (filter === 'ingredient') url += `filter.php?i=${search}`;
  if (filter === 'name') url += `search.php?s=${search}`;
  if (filter === 'first-letter') url += `search.php?f=${search}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};
