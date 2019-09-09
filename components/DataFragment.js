//DataFragment.js

import React, { Component } from 'react';

import {
  View,
  Text, 
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Image
} from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Lister extends Component {


  constructor(props) {
    super(props);
    //let p = this.props.options;
    //console.log(p);
    this.state = {
      tc: "white",
      bg: "blue",
      props:this.props.options,
      activeColor:"#8bc586",
      inactiveColor:"white",
      activeColor2:"#f7f7f7",
      inactiveColor2:"white",

      activeIconOpacity:1,
    };
  }

  onPress = (key,evt) => {
    console.log('item',key);

    let selected = true;
    if( this.state[key +'-active'] ){
      selected = false;
    }
    console.log('selected',selected); 
    this.setState({ 
      [key +'-active']: selected 
    });
  }

  createEl = () => {
    console.log('colo', this.state.bg);
    let colo = this.state.bg;
    //let listItems = this.state.props.map(function(item, i){ <- Tämä tapa ei toimi koska this unohtuu (eri scope)
    let listItems = this.state.props.map((item, i) => {
      //console.log('das',this.state.bg); 
      let ret = [];
      console.log('item',item); 
      ret.push(
        <View key="groupId{item.groupId}">
          <Text style={{fontSize: 20}}>{item.groupSafename}</Text>
        </View> 
      ); 

      item.items.map((itemInner, i2) => {
        //console.log('content ', itemInner);
        if(itemInner.hasInner){
          itemInner.innerItems.map( (innerItems, i3) => {
            var key = "questionNameInner" + itemInner.innerGroupId + "_" + innerItems.id;
            //console.log('key ', key ); 
            ret.push(
              <TouchableHighlight
                onPress={ (evt) => this.onPress(key,evt) } 
                key={key}>
                <View style={{...styles.selectableParent,
                backgroundColor: this.state[key +'-active'] ? this.state.activeColor : this.state.inactiveColor,
                }}>
                  <View style={{margin:15}}>
                    <View style={{...styles.selectableCheckbox,
                    backgroundColor: this.state[key +'-active'] ? this.state.activeColor2 : this.state.inactiveColor2,
                    }}>
                      <Image
                        style={{
                          width: 32, 
                          height: 32,
                          opacity: this.state[key +'-active'] ? this.state.activeIconOpacity : 0,
                        }}
                        source={require('../assets/icons/times_320_320.png')}
                      />
                    </View>
                  </View>
                  <View style={styles.selectableContent}>
                    <Text>#{key}# {innerItems.questionSafename}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            );
          });
        }else{
          var key = "questionName" + item.groupId + "_" + itemInner.id;
          ret.push(
            <View key={key}>
              <Text>#{key}# {itemInner.questionSafename}</Text>
            </View>
          );
          if( itemInner.type == "selection" ){
            itemInner.questions.map( (innerItems, i3) => { 
              var key = "theQuestionName" + innerItems.id + "_" + itemInner.id;
              ret.push(
                <View key={key}>
                  <Text>#{key}# {innerItems.safename}</Text>  
                </View>
                
              );
              innerItems.list.map( (selList, i4) => {
                var key = "selList" + i4 + "_" + i3 + "_" + i2;
                ret.push(  
                  <TouchableHighlight key={key}>
                    <Text>#{key}# {selList}</Text>  
                  </TouchableHighlight>
                );
              });

            });
          }        
        }
      });


      var key = "masterView" + item.groupId;
      return(
        <View key={key}>
          {ret}
        </View>
      ); 

    });
    return listItems;
  }

  render() {
    return (
      <View>{this.createEl()}</View>
    );
  }
}

let perfectCheckboxSize = 50;
let padding = 15;

let perfectChecbox = perfectCheckboxSize;
const styles = StyleSheet.create({
  selectableParent: {
    flex:1,
    flexDirection:'row',
    backgroundColor: '#FFF',
    borderColor: '#d6d7da',
    marginTop:5,
    marginBottom:5,
    justifyContent:"center",
    alignItems:"center",
  },
  selectableCheckbox: {
    height:perfectChecbox,
    width:perfectChecbox,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da'
  },
  selectableContent: {
    width:width-perfectChecbox - (padding*2),
    //backgroundColor:"#FFF",
    padding:padding,
  },
});

export default Lister;