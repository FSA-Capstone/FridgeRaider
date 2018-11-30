import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView, View} from 'react-native';
import { Text, Tabs, Tab } from 'native-base';

class RecipeDetails extends Component {
  
  constructor() {
    super();
  }

	render() {
    const { selectedRecipe } = this.props;

    return (
      <ScrollView>
        <Image source={{ uri: selectedRecipe.imageUrl}} style={{height: 200, width: null, flex: 1}}/>
        <Text>${selectedRecipe.name}</Text>
        <Text>{`By: ${selectedRecipe.postedBy[0].properties.name}`}</Text>
        <Text>{`Category: ${selectedRecipe.category[0].properties.name}`}</Text>
        <Text>{`Cuisine: ${selectedRecipe.cuisine[0].properties.name}`}</Text>
        <Tabs>
          <Tab heading="Ingredients">
          {
            selectedRecipe.ingredients.map((element, index) => 
              <Text key={index}>
                {`${element.relation.measure} ${element.properties.name}`}
              </Text>
            )
          }
          </Tab>
          <Tab heading="Instructions">
            <Text>{selectedRecipe.instructions}</Text>
          </Tab>
          <Tab heading="Reviews">
          {
            selectedRecipe.reviews.map((element, index) => 
              <View key={index}>
                <Text>{`Rating: ${element.relation.rating}`}</Text> 
                <Text>{`Description: ${element.relation.description}`}</Text> 
              </View>
            )
          }
          </Tab>
        </Tabs>
      </ScrollView>
    );
	}
}

const mapStateToProps = ({ selectedRecipe }) => {
  return {
    selectedRecipe
  };
};

export default connect(mapStateToProps)(RecipeDetails);
