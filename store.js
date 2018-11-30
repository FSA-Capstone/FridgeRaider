import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { recipeReducer, getRecipesForIngredients } from './reducers/recipes';
import { ingredientsReducer, getIngredients } from './reducers/ingredients';


const reducer = combineReducers({
  recipes: recipeReducer,
  ingredients: ingredientsReducer
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export {
  getRecipesForIngredients,
  getIngredients
};