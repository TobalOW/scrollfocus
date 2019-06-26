import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';

const INITIAL_STATE = [
  { id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isFocused: false },
  { id: 2, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isFocused: false },
  { id: 3, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isFocused: false },
  { id: 4, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isFocused: false },
  { id: 5, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isFocused: false },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      data: [
        { id: 1, text: 'strud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isFocused: true },
        { id: 2, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isFocused: false },
        { id: 3, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.', isFocused: false },
        { id: 4, text: 'Lorem ipsum dolor sit ametincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isFocused: false },
        { id: 5, text: 'Lorem eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isFocused: false },
      ],
    }
  }

  handleScroll(event) {
    const { x, y } = event.nativeEvent.contentOffset;
    // search if the actual value is between 2 parameters
    const indexOfValue = this.searchBetween(y);
    // update each card the backgroundColor

    //need put all in focused false and finally turn on the current card
    let dataCopy = JSON.parse(JSON.stringify(INITIAL_STATE))
    dataCopy[indexOfValue].isFocused = true
    this.setState({
       data: dataCopy,
       offsetY: y,
       offsetX: x,
     })
  }

  searchBetween(posY) {
    // console.log(posY);
    const a = this.state.sections;
    console.log({ a });
    // console.log({ posY });
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
          // Get dynamically height of card and accumulate height
          const {height} = event.nativeEvent.layout;
          if (index === 0) {
            this.state.sections[index] = 0;
            return;
          }
          this.state.sections[index] = height + 20 + this.state.sections[index - 1] / 2;
        }}
        containerStyle={{ opacity: card.isFocused || (card.isFocused && index === 0) ? 1 : 0.3 }}
        title='HELLO WORLD'
        >
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
          onLayout={(event) => {
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
