import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, TextInput, Image, Text, ImageBackground } from 'react-native';
import { ListItem, List, Button, Icon} from 'native-base';
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
		this.handleSearch = this.handleSearch.bind(this);
		this.handleClear = this.handleClear.bind(this);
	}

	handleChange(input) {
		this.setState({ input});
	}

	handleClear() {
		this.setState({ input: '', selectedIngredients: [] });
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

	handleSearch() {
		const { selectedIngredients } = this.state;
    this.props.getRecipesForIngredients(selectedIngredients);
    this.props.navigation.navigate('Recipes', { selectedIngredients });
	}

	render() {
    const { handleSearch, handleChange, addIngredient, handleClear } = this;
    const { selectedIngredients, input } = this.state;

    return (
			<ImageBackground source={require('../assets/background.png')}  style={styles.backgroundImage} >
				<View style={styles.container}>
					<Image source={require('../assets/logo.jpg')}/>
					<Text style={styles.heading}>What's in your fridge...?</Text>
					<View style={styles.addView}>
						<TextInput placeholder='Ingredient...' onChangeText={(input) => handleChange(input)} value={input}/>
						<Button info onPress={() => addIngredient()} style={styles.button}>
							<Icon name='add' />
						</Button>
					</View>

					{
						selectedIngredients.length > 0 
							? <List>
									{
										selectedIngredients.map((element, index) => 
										<ListItem key={index}>
											<Text>{element}</Text>
										</ListItem>
									)}
									</List>
							: <View />
					}
					<View style={styles.buttonView} >
						<Button info onPress={() => handleClear()} style={styles.bottomButtons}>
							<Text style={styles.buttonText}>Clear All</Text>
						</Button>
						<Button info onPress={() => handleSearch()} style={styles.bottomButtons}>
							<Text style={styles.buttonText}>Search for Recipes</Text>
						</Button>
					</View>
				</View>
			</ImageBackground>
    );
	}
}

const mapStateToProps = ({ ingredients }, { navigation }) => {
  return {
		ingredients,
		navigation
  };
};

const mapDispatchToProps = (dispatch) => {
	return {
    getIngredients: () => dispatch(getIngredients()),
    getRecipesForIngredients: (ingredients) => dispatch(getRecipesForIngredients(ingredients))
	};
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
		alignItems: 'center',
	},
	heading: {
		fontWeight: 'bold',
		fontSize: 20,
	},
	addView: {
		display: 'flex',
		flexDirection: 'row',
		margin: 10
	},
	button: {
		margin: 10
	},
	bottomButtons: {
		padding: 20,
		margin: 10,
	},
	buttonText: {
		fontWeight: 'bold',
		color: 'white'
	},
	buttonView: {
		position: 'absolute', 
		bottom: 0, 
		display: 'flex', 
		flexDirection: 'row'
	},
	backgroundImage: {
		width: '100%',
		height: '100%', 
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
