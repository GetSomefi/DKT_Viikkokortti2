//DataFragment.js

import React, { Component } from 'react';

import {
  View,
  Text, 
  StyleSheet
} from 'react-native';

class Lister extends Component {

  constructor(props) {
    super(props);
    let p = this.props.options;
    //console.log(p);

    let listItems = p.map(function(item, i){
      console.log('content ', item);
      return(
        <View key={item.id}>
          <Text>Test {i}</Text>
        </View>
      );
    });

    state = {
      listItems : listItems,
    }


  }
  render() {
    return (
      <View>{state.listItems}</View>
    );
  }
}


export default Lister;