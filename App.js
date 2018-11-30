import React from 'react';
import { createStackNavigator } from 'react-navigation'
import { createAppContainer } from '@react-navigation/native'
import { Provider } from 'react-redux';
import Home from './components/Home';
import Recipes from './components/Recipes';
import RecipeDetails from './components/RecipeDetails';
import store from './store';


const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Recipes: Recipes,
    RecipeDetails: RecipeDetails
  },
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}


