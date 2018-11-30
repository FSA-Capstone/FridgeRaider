import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Button } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import { getRecipe } from '../store';
import { Font, AppLoading } from "expo";

class RecipesScreen extends Component {
  
  constructor() {
    super();
    this.state = { loading: true };
		this.getRecipe = this.getRecipe.bind(this);
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }
  
  getRecipe(id) {
    //this.props.getRecipe(id);
    //this.props.navigation.navigate('RecipeDetails');
	}

	render() {
    const { recipes } = this.props;
    const { getRecipe } = this;
    const { loading } = this.state;

    return (
        loading 
          ? <AppLoading />
          : <Container>
              <Header>
                <Text>Recipes</Text>
              </Header>
              <Content>
              {
                recipes.map((recipe, index) => 
                <Card key={index}>
                <CardItem>
                  <Body>
                    <Text>{recipe.name}</Text>
                  </Body>
                </CardItem>
                <CardItem cardBody>
                  <Image source={{ uri: recipe.imageUrl}} style={{height: 200, width: null, flex: 1}}/>
                </CardItem>
                <CardItem>
                  <Body>
                    <Button onPress={() => getRecipe(recipe.id)} title='Details' />
                  </Body>
                </CardItem>
              </Card>
              )}        
              </Content>
          </Container> 
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
