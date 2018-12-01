import axios from 'axios';
import { API_URL } from '../constants'

const GET_RECIPE = 'GET_RECIPE';
const _getRecipe = recipe => ({ type: GET_RECIPE, recipe });


const getRecipe = (id, navigation) => {
  return dispatch => {
    let recipeName;
    return axios.get(`${API_URL}/api/recipes/${id}`)
      .then(response => response.data)
      .then(recipe => {
        recipeName = recipe.name;
        dispatch(_getRecipe(recipe));
      })
      .then(() => navigation.navigate('RecipeDetails', { recipeName }))
      .catch(error => console.log(error));
  };
};

const selectedRecipeReducer = (state = [], action) => {
  switch (action.type) {
    case GET_RECIPE:
      return action.recipe;
  }
  return state;
};

export { selectedRecipeReducer, getRecipe };