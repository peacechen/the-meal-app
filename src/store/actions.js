
export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';

export function setRecipes( recipes ) {
  return { type: SET_RECIPES, recipes };
}

export function addRecipe( recipe ) {
  return { type: ADD_RECIPE, recipe };
}
