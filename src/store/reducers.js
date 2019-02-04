// In a production app there would be multiple reducers, combined via combineReducers.
// For simplicity's sake this project uses a single reducer.
import * as actions from "./actions";

const initialState = {
  recipes: [],
}

const recipes = (state, action) => {
  if ( !state ) {
		return initialState;
	}

  switch (action.type) {
    case actions.SET_RECIPES:
      return {...state, recipes: action.recipes};
    case actions.ADD_RECIPE:
      return {...state, recipes: [...state.recipes, action.recipe]};
    default:
      return state;
  }
}

export default recipes
