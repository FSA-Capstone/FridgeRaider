import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView, View, StyleSheet} from 'react-native';
import { Text, Tabs, Tab, ListItem, List } from 'native-base';
import { Rating } from 'react-native-ratings';

class RecipeDetails extends Component {
  
  constructor() {
    super();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Text>{navigation.getParam('recipeName', '')}</Text>
      ),
    };
  };

	render() {
    const { selectedRecipe } = this.props;

    return (
      <ScrollView>
        <Image source={{ uri: selectedRecipe.imageUrl}} style={{height: 200, width: null}}/>
        <View >
          <Text style={styles.text}>{`By: ${selectedRecipe.postedBy[0].properties.name}`}</Text>
          <Text style={styles.text}>{`Category: ${selectedRecipe.category[0].properties.name}`}</Text>
          <Text style={styles.text}>{`Cuisine: ${selectedRecipe.cuisine[0].properties.name}`}</Text>
        </View>
        <Tabs>
          <Tab heading="INGREDIENTS" tabStyle={styles.tabColor} textStyle={styles.tabText} activeTabStyle={styles.activeTabColor}>
          <List>
          {
            selectedRecipe.ingredients.map((element, index) => 
              <ListItem key={index}>
                <Text>{`${element.relation.measure} ${element.properties.name}`}</Text>
              </ListItem>
            )
          }
          </List>
          </Tab>
          <Tab heading="DIRECTIONS" tabStyle={styles.tabColor} textStyle={styles.tabText} activeTabStyle={styles.activeTabColor}>
          {
            selectedRecipe.instructions.split('.').map((element, index) => 
              <Text key={index} style={styles.paddedText}>{`${element.trim()}.`}</Text>
            )
          }
          </Tab>
          <Tab heading="REVIEWS" tabStyle={styles.tabColor} textStyle={styles.tabText} activeTabStyle={styles.activeTabColor}>
          {
            selectedRecipe.reviews.map((element, index) => 
              <View key={index}>
                <Text style={styles.paddedText}>{element.properties.name}</Text> 
                <Rating type='star' ratingCount={element.relation.rating} imageSize={30} />
                <Text style={styles.paddedText}>{element.relation.description}</Text> 
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

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  tabColor: {
    backgroundColor: 'white',
  },
  tabText: {
    color: 'black',
  },
  activeTabColor: {
    backgroundColor: '#2196F3',
  },
  paddedText: {
    padding: 10
  },
  marginText: {
    margin: 10
  }
});

export default connect(mapStateToProps)(RecipeDetails);
