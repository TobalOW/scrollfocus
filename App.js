import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';

const ITEM_HEIGHT = 425.5238037109375 + 10;
const INITIAL_STATE = [
  { id: 1, text: ' voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isFocused: false },
  { id: 2, text: ' voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isFocused: false },
  { id: 3, text: ' voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isFocused: false },
  { id: 4, text: ' voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isFocused: false },
  { id: 5, text: ' voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isFocused: false },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      data: [
        { id: 1, text: ' voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isFocused: true },
        { id: 2, text: ' voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isFocused: false },
        { id: 3, text: ' voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isFocused: false },
        { id: 4, text: ' voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isFocused: false },
        { id: 5, text: ' voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isFocused: false },
      ],
    }
  }

  handleScroll(event) {
    const { x, y } = event.nativeEvent.contentOffset;
    // search if the actual value is between 2 parameters
    const indexOfValue = this.searchBetween(y);
    // update each card the backgroundColor
    let dataCopy = JSON.parse(JSON.stringify(INITIAL_STATE))
    dataCopy[indexOfValue].isFocused = true
    this.setState({
       data: dataCopy,
       offsetY: y,
       offsetX: x,
     })
  }

  searchBetween(posY) {
    const a = this.state.sections;
    // Get index of value that was between in two values
    return a.findIndex(
      (currentY) => {
        if (currentY <= posY) {
          return a[a.findIndex((value) => value === currentY)] > posY
        }
        return -1
      }
    )
  }


  renderItem(item) {
    const card = item.item;
    const index = item.index;
    return (
      <Card
        onLayout={(event) => {
          var {x, y, width, height} = event.nativeEvent.layout;
          this.setState(prevState => ({
              sections: [
                  ...prevState.sections,
                  index * height
              ],
          }));
        }}
        containerStyle={{ opacity: card.isFocused ? 1 : 0.3 }}
        title='HELLO WORLD'
        image={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg" }}>
        <Text style={{marginBottom: 10}}>
          { card.text }
        </Text>
        <Button
          icon={<Icon name='code' color='#ffffff' />}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='VIEW NOW' />
      </Card>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => item.id}
          renderItem={( item ) => this.renderItem(item)}
          onScroll={this.handleScroll.bind(this)}
          scrollEventThrottle={100}
          onLayout={ (event) => {
            const {x, y, width, height} = event.nativeEvent.layout;
            this.setState({
              scrollViewX: x,
              scrollViewY: y,
              scrollViewWidth: width,
              scrollViewHeight: height,
            })
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
});
