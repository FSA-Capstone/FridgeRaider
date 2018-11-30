import React from 'react';
import { createStackNavigator } from 'react-navigation'
import { createAppContainer } from '@react-navigation/native'
import { Provider } from 'react-redux';
import HomeScreen from './components/HomeScreen';
import RecipesScreen from './components/RecipesScreen';
import store from './store';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Recipes: RecipesScreen
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


