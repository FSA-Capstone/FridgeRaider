import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, TextInput, Image, Text, ImageBackground, TouchableOpacity, ListView} from 'react-native';
import { Button } from 'native-base';
import { debounce } from 'throttle-debounce';
import { AppLoading } from "expo";
import { getIngredients, getRecipesForIngredients } from '../store';
import RowWrapper from './RowWrapper';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class Home extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
      selectedIngredients: [],
      searchedIngredients: [],
      loading: true,
		};
		this.handleChange = this.handleChange.bind(this);
		this.addIngredient = this.addIngredient.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  async componentDidMount() {
    await this.props.getIngredients();
    this.setState({ loading: false });
  }
  
  handleChange = (input) => {
    this.setState({ input })
    debounce(300, () => {
      const findMatch = (name1, name2) => (name1.toLowerCase().indexOf(name2.toLowerCase()) > -1)
      const results = this.props.ingredients.filter(element => {
        if (findMatch(element, input)) return element
      })
      this.setState({ searchedIngredients: !input.length ? [] : results }) 
    })()
  }

	handleClear() {
		this.setState({ input: '', selectedIngredients: [] });
	}

	addIngredient(ingredient) {
		const { selectedIngredients } = this.state;
		if (ingredient.length && !selectedIngredients.includes(ingredient)) {
			selectedIngredients.push(ingredient);
			this.setState({
				selectedIngredients,
        input: '',
        searchedIngredients: []
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
    const { selectedIngredients, input, searchedIngredients, loading } = this.state;

    return (
      loading 
        ? <AppLoading />
			  : <ImageBackground source={require('../assets/background.png')}  style={styles.backgroundImage} >
            <View style={styles.container}>
              <Image source={require('../assets/logo.jpg')}/>
              <Text style={styles.heading}>What's in your fridge...?</Text>
              <View>
                <Text>{ selectedIngredients.join(',') }</Text>
              </View>
              <View style={styles.addView}>
                <TextInput placeholder='Ingredient...' onChangeText={(input) => handleChange(input)} 
                  value={input} style={styles.textInput} />
              </View>
              <View>
                <ListView keyboardShouldPersistTaps='always' 
                  initialListSize={10} enableEmptySections dataSource={ds.cloneWithRows(searchedIngredients)}
                  renderRow={(rowData, sectionId, rowId, highlightRow) => (
                    <RowWrapper styles={styles.rowWrapper}>
                      <TouchableOpacity activeOpacity={0.5} onPress={() => addIngredient(searchedIngredients[rowId])}>
                        <Text>{rowData}</Text>
                      </TouchableOpacity>
                    </RowWrapper>
                  )}
                />
              </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
		alignItems: 'center',
	},
	heading: {
		fontWeight: 'bold',
    fontSize: 20,
    margin: 10
	},
	addView: {
		display: 'flex',
		flexDirection: 'row',
    margin: 10,
    width: 300,
  },
  textInput: {
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
    alignItems: 'center',
    height: 40,
    backgroundColor: 'white',
    width: 300,
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
  },
  rowWrapper: {
    zIndex: 999,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    opacity: 0.8,
    borderTopColor: 'lightgrey',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  }
});

const mapStateToProps = ({ ingredients }, { navigation }) => {
  return {
		ingredients: ingredients.sort(),
		navigation
  };
};

const mapDispatchToProps = (dispatch) => {
	return {
    getIngredients: () => dispatch(getIngredients()),
    getRecipesForIngredients: (ingredients) => dispatch(getRecipesForIngredients(ingredients))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
