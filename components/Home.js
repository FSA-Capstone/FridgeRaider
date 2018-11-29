import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, ListView, TextInput } from 'react-native';
import { getIngredients, getRecipesForIngredients } from '../store';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			selectedIngredients: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.addIngredient = this.addIngredient.bind(this);
		this.removeIngredient = this.removeIngredient.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
  }
  
  componentDidMount() {
    this.props.getIngredients();
  }

	handleChange(input) {
		this.setState({ input});
	}

	addIngredient() {
		const { selectedIngredients } = this.state;
		const ingredient = this.state.input.trim();
		if (ingredient !== '') {
			selectedIngredients.push(ingredient);
			this.setState({
				selectedIngredients,
				input: ''
			});
		}
	}

	removeIngredient(ingredient) {
		let { selectedIngredients } = this.state;
		const index = selectedIngredients.indexOf(ingredient);
		if (index !== -1) {
			selectedIngredients.splice(index, 1);
			this.setState({
				selectedIngredients
			});
		}
	}

	handleSearch() {
    //this.props.getRecipesForIngredients(this.state.ingredients);
    //TO DO: Navigate to another screen
    //.then(() => this.props.history.push('/recipes'));
	}

	render() {
    const { handleSearch, handleChange, addIngredient, removeIngredient } = this;
    const { selectedIngredients, input } = this.state;
    const { ingredients } = this.props;

    return (
      <View>
        <Text>What do you have in your fridge...?</Text>
        {
          selectedIngredients.length > 0 ? 
            <View>
              <Button onPress={() => handleSearch()} title='Search For Recipes' />
              {
                selectedIngredients.map((element, index) => 
                  <View key={index} style={{display: 'flex', flexDirection: 'row'}}>
                    <Text>{element}</Text>
                    <Button style={{margin: 20}} onPress={() => removeIngredient(element)} title='x' />
                  </View>)
              }
            </View>
            : <View />
        }
				<TextInput onChangeText={(input) => handleChange(input)} value={input} />
				<Button onPress={() => addIngredient()} title='Add Ingredient' />

      </View>
      
    );
	}
}

const mapStateToProps = ({ ingredients }) => {
  return {
    ingredients
  };
};

const mapDispatchToProps = (dispatch) => {
	return {
    getIngredients: () => dispatch(getIngredients()),
    getRecipesForIngredients: (ingredients) => dispatch(getRecipesForIngredients(ingredients))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
