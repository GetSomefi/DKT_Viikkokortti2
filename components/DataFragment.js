//DataFragment.js

import React, { Component } from 'react';

import AsyncStorage from '@react-native-community/async-storage'; //https://github.com/react-native-community/async-storage/blob/LEGACY/docs/API.md#getItem

import {
  View,
  Text, 
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Image,
  TextInput,
  UseEffect
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
		  //showDebug:true, //shows keys if those are set inside elements

		  tc: "white",
		  bg: "blue",
		  propsOptions:this.props.options,
		  activeColor:"#8bc586", //green
		  inactiveColor:"white",
		  activeColor2:"#f7f7f7", //lighter gray
		  inactiveColor2:"white",
		  activeColor3:"#f1f1f1", //light gray
		  inactiveColor3:"#FFF",

		  activeIconOpacity:1,
		};
	}

	choiceSelected = (key,evt,el) => {
		console.log("-- key to store",key);

		let selected = true;
		if( this.state[key +'-active'] ){
		  selected = false;
		}
		console.log('selected',selected); 
		this.setState({ 
		  [key +'-active']: selected 
		});

		console.log('state', this.state);

		console.log('el', el);
		var d = new Date();
		let date = d.getDate() + "_" + d.getMonth() + "_" + d.getYear();
		this.storeData(el,date);
		//el.questionSafename = "sad";
		//return el;

		this.setState({
			[key +'-selectedValue']:"valittu"
		});
		console.log(this.state);
	}

	t = () => {
		console.log('test'); 
	}

	debugTexts = () => {
		console.log('debug texts ', this.state.showDebug); 
		this.setState({ 
		  showDebug: !this.state.showDebug
		});
	}

	storeData = async (data,key) => {
		console.log('yrittää'); 
		try {
			await AsyncStorage.setItem(key, JSON.stringify(data));
			
		} catch (error) {
			// Error saving data
			console.log('Save error',error); 
		}
		console.log('Key:', key);
		console.log('Data:', data);
	};

	retrieveData = async (key) => {
	  try {
	    const value = await AsyncStorage.getItem(key);
	    if (value !== null) {
	      // We have data!!
	      console.log(value);
	    }
	  } catch (error) {
	    // Error retrieving data
	    console.log('Retrieve error',error); 
	  }
	};

	createEl = () => {
		//this.state.propsOptions[i]
		let copyPropsOptions = [...this.state.propsOptions];

		let ret = [];
		let listItems = copyPropsOptions.map((item, i) => {
		  //console.log('das',this.state.bg);  
		  //console.log('item',item); 
		  var key = "id|" + item.id;
		  ret.push(	  	
		    <View key={key}>
				{ this.state.showDebug ? (<Text style={styles.debugTexts}>#{key}#</Text>) : null }
		      	<Text style={styles.header1}>{item.groupSafename}</Text>
		    </View> 
		  ); 


		  //this.state.propsOptions[i][i2]
		  return item.items.map((itemInner, i2) => {
		    //console.log('content ', itemInner);
		    if(itemInner.hasInner){

		      //this.state.propsOptions[i][i2][i3]
		      return itemInner.items.map( (innerItems, i3) => {
		        var key = "questionName|" + item.id + "_" + itemInner.id + "_" + innerItems.id;
		        let keyArray = [item.id, itemInner.id, innerItems.id];
				if(innerItems.type == "freetext"){ 
				ret.push(
				<TouchableHighlight 
					key={key+"_freetext"}
					onPress={() => this.setState({ isEditing: true })}
				>
				    <View style={{...styles.freeTextParent,
				    	backgroundColor: this.state.isEditing ? this.state.activeColor3 : this.state.inactiveColor3
					}}>
					  <Text style={styles.labelHeader}>
				    	{ this.state.showDebug ? (<Text style={styles.debugTexts}>#{key}#</Text>) : null }
						{innerItems.questionSafename}
					  </Text>

					  { this.state.isEditing ?
					    <TextInput
					      multiline={true}
					      value={this.state.txt}
					      onChangeText={(value) => this.setState({ txt: value })}
					      autoFocus
					      onBlur={() => this.setState({ isEditing: false })}
					    /> :
					    <Text
					      style={styles.freeTextEditable}
					    >
					      { !this.state.txt ? innerItems.extraName : 
					      	this.state.txt
					  	  } 
					    </Text> 
					  }
					</View>
				</TouchableHighlight>
				)
				}
				//this.state.propsOptions[i][i2][i3]
				else{
				

				ret.push(
				  <TouchableHighlight
				    onPress={ 
				    	(evt) => {
				    		innerItems.selectedValue = "true";	
				    		this.choiceSelected(key,evt,listItems);	
				    	}
				    	
				    	//innerItems.seletedValue = true
				    } 
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
				          # {innerItems.selectedValue}
				        </Text>
				      </View>
				    </View>
				  </TouchableHighlight>
				);
				}
				return innerItems;
		      });
		    }
		    else{
		      var key = "innerGroupName" + item.id + "_" + itemInner.id;          
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

		        return itemInner.items.map( (innerItems, i3) => { 
		          var key = "listsQuestionName|" + item.id + "_" + innerItems.id + "_" + itemInner.id;
		          
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
		          let listOfChoices = innerItems.list.map( (selList, i4) => {
		            var key = "selectListChoice|" + item.id + "_" + innerItems.id + "_" + itemInner.id + "_" + i4;
		            ret2.push(  
		              <TouchableHighlight
			                onPress={  
					    	(evt) => {
					    		innerItems.selectedValue = i4 + 1; //HUOMAA TÄMÄ luonnissa!
					    		this.choiceSelected(key,evt,listItems);	
					    	}
					    } 
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
		            return selList;
		          });

		          var key = "theQuestionChoices|" + item.id + "_" + innerItems.id + "_" + itemInner.id;
		          ret.push(
		            <View key={key} style={styles.selectableChoiceParent}>
		              {ret2} 
		            </View>
		            
		          );
		          //return listOfChoices;
		          return innerItems;
		        });
		      }   
		    }
		  });

			
		  var key = "masterView|" + item.id;
		  ret.push(
		    <View key={key}>
		      {ret}
		    </View>
		  ); 

		});

		//console.log(listItems);
		return ret;
	}


	render() {
		return (
			<View key="masterView">
				<TouchableHighlight 
					style={{...styles.button,
		        		backgroundColor: this.state.showDebug ? this.state.activeColor : this.state.inactiveColor,
		        	}} 
		        	onPress={ (evt) => this.debugTexts() }>
		        	<Text>
		        		Debug {this.state.showDebug}
		        	</Text>
		        </TouchableHighlight>
				<TouchableHighlight style={styles.button} onPress={(evt) => this.storeData(this.state.txt,"tieto1") }><Text>Test write</Text></TouchableHighlight>
				<TouchableHighlight style={styles.button} onPress={(evt) => this.retrieveData("tieto1") }><Text>Test read</Text></TouchableHighlight>
				{this.createEl()}
			</View>
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

  labelHeader:{
    fontSize: 16,
    paddingBottom:padding,
  },

  freeTextParent: {
    backgroundColor: '#FFF',
    borderColor: '#d6d7da',
    justifyContent:"center",
    alignItems:"flex-start",
    margin:padding,
    padding:padding,
    borderRadius:borderRadius,
  },
  freeTextEditable: {
    justifyContent:"flex-end",
    paddingBottom:padding,
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
    //borderWidth:1,
    //borderColor:'#d6d7da',
    marginRight:padding
  },

  //button
  button: {
    height:perfectChecbox,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:borderRadius,
    //borderWidth:1,
    //borderColor:'#d6d7da',
    margin:padding,
    backgroundColor: '#FFF',
  },
});

export default Lister;