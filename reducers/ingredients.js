import axios from 'axios';
import { API_URL } from '../constants'


const GET_INGREDIENTS = 'GET_INGREDIENTS';
const _getIngredients = (ingredients) => ({type: GET_INGREDIENTS, ingredients})

const getIngredients = () => {
  return (dispatch) => {
    return axios.get(`${API_URL}/api/ingredients/`)
      .then(res => res.data)
      .then(ingredients => dispatch(_getIngredients(ingredients)))
      .catch(error => console.log(error))
  };
}

const ingredientsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return action.ingredients;
  }
  return state;
};

export { ingredientsReducer, getIngredients };
