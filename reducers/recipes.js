import axios from 'axios';
import { API_URL } from '../constants'

const GET_RECIPES = 'GET_RECIPES';
const _getRecipes = recipes => ({ type: GET_RECIPES, recipes });


const getRecipesForIngredients = ingredients => {
  return dispatch => {
    return axios.get(`${API_URL}/api/recipes?ingredients=${encodeURI(ingredients.join(','))}`)
      .then(res => res.data)
      .then(recipes => dispatch(_getRecipes(recipes)))
      .catch(error => console.log(error));
  };
};


// reducer
const recipeReducer = (state = [], action) => {
  switch (action.type) {
    case GET_RECIPES:
      return action.recipes;
  }
  return state;
};

export { recipeReducer, getRecipesForIngredients };
