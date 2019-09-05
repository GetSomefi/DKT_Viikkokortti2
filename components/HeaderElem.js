//Header.js

import React, { Component } from 'react';

import {
  View,
  Image,
  ImageBackground,
  Text, 
  StyleSheet
} from 'react-native';

class HeaderElem extends Component {

  constructor(props) {
    super(props);
    let p = this.props;
  }
  render() {
    //console.log("dsa2", this.props.imgSrc);
    //console.log(this.props);
    //console.dir(this.props);
    
    if(this.props.joku == "jotain"){
      return (
        <View>
          <Text>Kirjoitit {this.props.joku}</Text>
        </View>
      ); 
    }else{
      return (
        <View> 
          <Text>Teksti oli {this.props.joku}</Text>
        </View>
      ); 
    }

  }
}

const styles = StyleSheet.create({
  asBgImg:{
    width: "100%", 
    height: "100%",
    flex:1, 
  },  
  asImg:{
    position:'absolute',
    width: "100%", 
    height: "100%",  
  },  
  img:{
    position:'absolute',
    width: "100%",
    height: "100%",
  }, 
});

export default HeaderElem;