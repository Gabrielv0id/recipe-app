export const handleFetch = async (type, filter, search) => {
  const handleApi = (site) => {
    if (filter === 'name') {
      return site + search;
    }
    if (filter === 'first-letter') {
      return site + search;
    }
    if (filter === 'ingredient') {
      site = site.replace('search.php?s=', 'filter.php?c=');
      return site + search;
    }
    if (filter === 'category') {
      site = site.replace('search.php?s=', 'filter.php?c=');
      return site + search;
    }
    return site;
  };

  try {
    let url;
    // Montagem da URL de acordo com o tipo de busca
    switch (type) {
    case 'meals':
      url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      url = handleApi(url);
      break;
    case 'drinks':
      url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      url = handleApi(url);
      break;
    default:
      break;
    }
    // if (type === 'meals') url = 'https://www.themealdb.com/api/json/v1/1/';
    // if (type === 'drinks') url = 'https://www.thecocktaildb.com/api/json/v1/1/';
    // if (filter === 'ingredient') url += `filter.php?i=${search}`;
    // if (filter === 'name') url += `search.php?s=${search}`;
    // if (filter === 'first-letter') url += `search.php?f=${search}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data[type] === null) return { [type]: [] };
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Erro ao buscar dados da API');
  }
};

export const handleButtonFetch = async (type) => {
  let url;
  switch (type) {
  case 'meals':
    url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    break;
  case 'drinks':
    url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    break;
  default:
    break;
  }

  const response = await fetch(url);
  const data = response.json();
  return data;
};
