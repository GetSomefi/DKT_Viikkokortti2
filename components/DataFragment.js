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
      showDebug:false, //shows keys if those are set inside elements

      tc: "white",
      bg: "blue",
      props:this.props.options,
      activeColor:"#8bc586", //green
      inactiveColor:"white",
      activeColor2:"#f7f7f7", //light gray
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
    //let listItems = this.state.props.map(function(item, i){ <- Tämä tapa ei toimi koska this unohtuu (eri scope)
    let listItems = this.state.props.map((item, i) => {
      //console.log('das',this.state.bg); 
      let ret = [];
      //console.log('item',item); 
      ret.push(
        <View key="groupId{item.groupId}">
          <Text style={styles.header1}>{item.groupSafename}</Text>
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
                    <Text>
                      { this.state.showDebug ? (<Text style={styles.debugTexts}>#{key}#</Text>) : null }
                      {innerItems.questionSafename}
                      {innerItems.extraName != "" ? "\n" : null}
                      {innerItems.extraName}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            );
          });
        }
        else{
          var key = "questionName" + item.groupId + "_" + itemInner.id;          
          if( itemInner.type == "selection" ){
            
            if(itemInner.questionSafename){
	            ret.push(
	              <View key={key}>

	                <Text style={styles.header2}>
	                  { this.state.showDebug ? (<Text style={styles.debugTexts}>#{key}#</Text>) : null }
	                  {itemInner.questionSafename}
	                </Text>
	              </View>
	            );
	        }

            itemInner.questions.map( (innerItems, i3) => { 
              var key = "theQuestionName" + innerItems.id + "_" + itemInner.id;
              
              if(innerItems.safename){
	              ret.push(
	                <View key={key}>
	                  <Text style={styles.header3}>
	                    { this.state.showDebug ? (<Text style={styles.debugTexts}>#{key}#</Text>) : null }
	                    {innerItems.safename}
	                  </Text>  
	                </View>
	              );
			  }          

              let ret2 = [];
              innerItems.list.map( (selList, i4) => {
                var key = "selList" + item.groupId + "_" + i4 + "_" + i3 + "_" + i2;
                ret2.push(  
                  <TouchableHighlight
                    onPress={ (evt) => this.onPress(key,evt) } 
                    key={key}>
                      <View style={{...styles.selectableChoice,
                      backgroundColor: this.state[key +'-active'] ? this.state.activeColor : this.state.inactiveColor,
                      }}>
                        <Text>
                          { this.state.showDebug ? (<Text style={styles.debugTexts}>#{key}#</Text>) : null }
                          {selList}
                        </Text> 
                      </View> 
                  </TouchableHighlight>
                );
              });

              var key = "theQuestionChoices" + innerItems.id + "_" + itemInner.id;
              ret.push(
                <View key={key} style={styles.selectableChoiceParent}>
                  {ret2} 
                </View>
                
              );

            });
          }        
        }
      });


/*
          if(item.type = "selectone"){
            console.log('type', item); 
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
                    <Text>
                      { this.state.showDebug ? (<Text style={styles.debugTexts}>#{key}#</Text>) : null }
                      {item.questionSafename}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            );
          }
*/

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
let borderRadius = 5;

let perfectChecbox = perfectCheckboxSize;
const styles = StyleSheet.create({
  debugTexts:{
    backgroundColor:"red"
  },

  header1:{
    fontSize: 28,
    padding:padding,
  },
  header2:{
    fontSize: 24,
    padding:padding,
  },
  header3:{
    fontSize: 20,
    padding:padding,
  },

  selectableParent: {
    flex:1,
    flexDirection:'row',
    backgroundColor: '#FFF',
    borderColor: '#d6d7da',
    justifyContent:"center",
    alignItems:"center",
    margin:padding,
    borderRadius:borderRadius,
  },
  selectableCheckbox: {
    height:perfectChecbox,
    width:perfectChecbox,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:borderRadius,
    borderWidth:1,
    borderColor:'#d6d7da',
    marginLeft:(padding*2),
  },
  selectableContent: {
    width:width-perfectChecbox - (padding*2),
    //backgroundColor:"#FFF",
    padding:padding,
    paddingLeft:0,
  },
  selectableChoiceParent: {
    flex:1,
    flexDirection:'row',
    padding:padding
  },
  selectableChoice: {
    height:perfectChecbox,
    width:perfectChecbox,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:borderRadius,
    borderWidth:1,
    borderColor:'#d6d7da',
    marginRight:padding
  },
});

export default Lister;