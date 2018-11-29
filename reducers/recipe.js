import axios from 'axios';
import { API_URL } from '../constants'

// action constants
const GET_RECIPES = 'GET_RECIPES';
const GET_RECIPE = 'GET_RECIPE';
const ADD_RECIPE = 'ADD_RECIPE';

// action creators
const _getRecipes = recipes => {
  return {
    type: GET_RECIPES,
    recipes
  };
};

const _getRecipe = recipe => {
  return {
    type: GET_RECIPE,
    recipe
  }
}

const _addRecipe = recipe => {
  return {
    type: ADD_RECIPE,
    recipe
  };
};

// thunks
const createNewRecipe = recipe => {
  return dispatch => {
    return axios.post(`${API_URL}/api/recipes/`, recipe)
      .then(response => dispatch(_addRecipe(response.data)))
      .catch(error => console.log(error));
  };
};

const getRecipesForIngredients = ingredients => {
  return dispatch => {
    return axios.get(`${API_URL}/api/recipes?ingredients=${encodeURI(ingredients.join(','))}`)
      .then(res => res.data)
      .then(recipes => dispatch(_getRecipes(recipes)))
      .catch(error => console.log(error));
  };
};


const getRecipe = (id) => {
  return (dispatch) => {
    return axios.get(`${API_URL}/api/recipes/${id}`)
      .then(res => res.data)
      .then(recipe => dispatch(_getRecipe(recipe)))
      .catch(error => console.log(error))
  };
}

// reducer
const recipeReducer = (state = { recipes: [], recipe: {} }, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return { recipes: action.recipes, recipe: {} };
    case GET_RECIPE:
      return {...state, recipe: action.recipe };
  }
  return state;
};

export { createNewRecipe, recipeReducer, getRecipesForIngredients, getRecipe };
