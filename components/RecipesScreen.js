import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { getRecipe } from '../store';

class RecipesScreen extends Component {
  
  

	render() {
    const { recipes } = this.props;

    return (
      <View>
        <Text>Recipes</Text>
        {
          recipes.map((element, index) => 
            <View key={index} style={{display: 'flex', flexDirection: 'row'}}>
              <Text>{element.name}</Text>
            </View>)
        }
      </View>
      
    );
	}
}

const mapStateToProps = ({ recipes }) => {
  return {
    recipes
  };
};

const mapDispatchToProps = (dispatch) => {
	return {
    getRecipe: (id) => dispatch(getRecipe(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesScreen);
