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
let keyAppend = "t20_";

let original;
function copyOriginal(ori) {
  return JSON.parse(JSON.stringify(ori));
}

class Lister extends Component {
	constructor(props) {
		super(props);
		//console.log("date got: ", this.props.date);
		//console.log("day note status: ", this.props.dayNote);
		
		let preparedDate = this.props.date;
		let preparedDateSafe = preparedDate.getDate() + "." + preparedDate.getMonth() +"."+ preparedDate.getFullYear();

		original = copyOriginal(this.props.options);
		const originalOptions = copyOriginal(this.props.options);
		//console.log('originalOptions',originalOptions); 

		this.state = {
		  dayNote:this.props.dayNote,
		  showDebug:false, //shows keys if those are set inside elements

		  tc: "white",
		  bg: "blue",

		  activeKey:"",
		  
		  originalOptions:originalOptions,

		  //this is to value that is constantly updated and stored
		  propsOptions:originalOptions,
		  date:preparedDate,
		  dateSafe:preparedDateSafe,
		  activeColor:"#8bc586", //green
		  inactiveColor:"white",
		  activeColor2:"#f7f7f7", //lighter gray
		  inactiveColor2:"white",
		  activeColor3:"#f1f1f1", //light gray
		  inactiveColor3:"#FFF",

		  activeIconOpacity:1,
		};
	}

	componentDidMount(){
		this.createElStored();
		//this.createEl();
	}
	componentWillUnmount(){
		//this.createElStored();
		//this.createEl();
	}
	componentDidUpdate(prevProps){
		// Typical usage (don't forget to compare props):
		if (this.props.dayNote !== prevProps.dayNote) {
			//this.fetchData(this.props.userID);
			this.setState({
				dayNote:this.props.dayNote,
			});
		}
	}
	/*
	componentDidUnmount(){

	}

	*/

  	resetDayNote = (value) => {
  		console.log('daynote', value);  
  		this.setState({
  			dayNote:value
  		});
  	}

	//updates daynote
	updateDayNote = (value) => {
		console.log('value', value); 
		let copyPropsOptions = [...this.state.propsOptions];
		console.log('before', copyPropsOptions); 
		let listItems = copyPropsOptions.map((item, i) => {
			if(item.note){
				console.log('------tämä on note');
				console.log('--', item.selectedValue);
				item.selectedValue = value;
			}
			return item;
		});
		console.log('after', listItems); 
		console.log('this.state.activeKey',this.state.activeKey); 
		this.storeData(listItems,this.state.activeKey);
	}

	//sends any choice to storage
	choiceSelected = (key,evt,el) => {
		//console.log("-- key to store",key);

		let selected = true;
		if( this.state[key +'-active'] ){
		  selected = false;
		}
		//console.log('selected',selected); 
		this.setState({ 
		  [key +'-active']: selected 
		});

		//console.log('state', this.state);

		//console.log('el', el);
		//var d = new Date();
		/*
		let d = this.state.date;
		let date = d.getDate() + "_" + d.getMonth() + "_" + d.getYear();
		this.storeData(el,date);
		*/
		this.storeData(el,this.state.activeKey);
		
		//el.questionSafename = "sad";
		//return el;
		
		/*
		this.setState({
			[key +'-selectedValue']:"valittu"
		});
		console.log(this.state);
		*/
	}

	changeDate = (changeDateTo) => {
		//console.log('change date direction ' + changeDateTo);
		//console.log('date in ', this.props.date);

		let changedDate;
		if(changeDateTo == "prev"){
			changedDate = this.props.date;
			changedDate.setDate(changedDate.getDate() - 1);
			//console.log('date prev ', changedDate);
		}else if(changeDateTo == "next"){
			changedDate = this.props.date;
			changedDate.setDate(changedDate.getDate() + 1);
			//console.log('date prev ', changedDate);
		}

		this.setState({
		  date: changedDate
		});

		//console.log('date out ', this.props.date); 
		this.createElStored();
	}

	setSelectionActive = (key) => {
		this.setState({
    		[key +'-active']:true
    	});
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
			console.log('data',data); 
			await AsyncStorage.setItem(key, JSON.stringify(data));

			let dayNoteStoredTemp;
			let copyPropsOptions = [...data];
			let listItems = copyPropsOptions.map((item, i) => {
				if(item !== null){
					console.log('item.selectedValue ', item.selectedValue); 
			  		if(item.note){
			  			dayNoteStoredTemp = item.selectedValue
			  		}
		  		}
		  	});

			this.setState({
			  dayNoteStored:dayNoteStoredTemp,
			  dayNoteStoredTemp:dayNoteStoredTemp
			});
			console.log('dayNoteStored',this.state.dayNoteStored);
			
		} catch (error) {
			// Error saving data
			console.log('Save error',error); 
		}
		/*
		console.log('Key:', key);
		console.log('Data:', data);
		console.log('Alkup', this.props.options); 
		*/
	};

	//createElStored = () => {
	createElStored = async() => {
		//retrieve data and if it does not exist (i.e. new day) it runs empty new createEl;
		console.log('fetching saved data');
		//console.log('using date', this.state.date); 
		//var d = new Date();

		

		let d = this.state.date;
		let key = keyAppend + d.getDate() + "_" + d.getMonth() + "_" + d.getYear();
		let changedDateSafe = this.props.date.getDate() + "." + this.props.date.getMonth() +"."+ this.props.date.getFullYear();
		
		let today = new Date();
		today = keyAppend + today.getDate() + "_" + today.getMonth() + "_" + today.getYear();
		
		//console.log('today == key', today +"=="+ key); 
		let showNextDayButton = true;
		if(today == key){
			showNextDayButton = false;
		}

		this.setState({
			activeKey:key,
			dateSafe:changedDateSafe,
			showNextDayButton:showNextDayButton,
			loading:true
		});

		//doRender
		//with this whole datafragment can be hidden (if false) 
		try {
			//const value = AsyncStorage.getItem(key);
			const value = await AsyncStorage.getItem(key);
			const parsedStoredData = JSON.parse(value);
			if (value !== null) {
				console.log('dataa on',parsedStoredData);

				let dayNoteStoredTemp;
				let copyPropsOptions = [...parsedStoredData];
				let listItems = copyPropsOptions.map((item, i) => {
					if(item !== null){
						console.log('item.selectedValue ', item.selectedValue); 
				  		if(item.note){
				  			dayNoteStoredTemp = item.selectedValue
				  		}
			  		}
			  	});

				this.setState({ 
				  propsOptions: parsedStoredData,
				  doRender:true,
				  loading:false,
				  reset:false,
				  takeOriginal:false,
				  dayNoteStored:dayNoteStoredTemp,
				  dayNoteStoredTemp:dayNoteStoredTemp
				});
				console.log('dayNoteStored',this.state.dayNoteStored);
			}else{
				//console.log('dataa ei ole (key)', key);
				//console.log('kun dataa['+this.state.activeKey+'] ei ole obj', this.state.originalOptions); 
				
				//console.log('ota orginaali');
				//console.log('state.ori',this.state.originalOptions[0].items[0].items[0]); 
				//console.log('muuttuja original',original[0].items[0].items[0]);  
				let copyPropsOptions_ = copyOriginal(this.state.originalOptions);// [...original]
				copyPropsOptions = [...copyPropsOptions_];

				this.setState({
					propsOptions: copyPropsOptions,
					doRender:true,
					loading:false,
					reset:true,
					takeOriginal:true
				});
			}


		} catch (error) {
			// Error retrieving data
			console.log('Retrieve error',error); 
		}		
	};

	createEl = () => {
		//console.log('--day note--', this.state.dayNoteOn);
		//console.log('--createEl--', this.state.reset); 
		//this.state.propsOptions[i]
		
		/*
		///let copyPropsOptions = [...this.state.propsOptions];
		console.log('oriPropsOptions', this.props.options);
		let copyPropsOptions = this.state.propsOptions;
		

		console.log('copyPropsOptions', copyPropsOptions); 
		//this.createElStored();
		*/
		/* 
		let copyPropsOptions; 
		if(this.state.takeOriginal){
			console.log('ota orginaali');
			copyPropsOptions = [...copyPropsOptions_];
		}else{
			console.log('ota talletettu');
			copyPropsOptions = [...this.state.propsOptions];
		}
		*/
		let dayNoteStored;
		let copyPropsOptions = [...this.state.propsOptions];

		let ret = [];
		//let listItems = copyPropsOptions.map((item, i) => {
		let listItems = copyPropsOptions.map((item, i) => {

		  if(!item.note){

		  var key = "id|" + item.id; 
		  ret.push(	  	
		    <View key={key}>
				{ this.state.showDebug ? (<Text style={styles.debugTexts}>#{key}#</Text>) : null }
		      	<Text style={styles.header1}>{item.groupSafename}</Text>
		    </View>
		  ); 

		  //this.state.propsOptions[i][i2]
		  item.items.map((itemInner, i2) => {
		    //console.log('content ', itemInner);
		    if(itemInner.hasInner){

		      //this.state.propsOptions[i][i2][i3]
		      return itemInner.items.map( (innerItems, i3) => {
		        var key = this.state.activeKey + "questionName|" + item.id + "_" + itemInner.id + "_" + innerItems.id;
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
						      value={innerItems.selectedValue}
						      onChangeText={
						      	(value) => {
						      		this.setState({ txt: value })
						      		innerItems.selectedValue = value;
						    		this.choiceSelected(key,null,listItems);
						      	}
						  	  }
						      autoFocus
						      onBlur={() => this.setState({ isEditing: false })}
						    /> :
						    <Text
						      style={styles.freeTextEditable}
						    >
								{ !innerItems.selectedValue ? innerItems.extraName : 
									innerItems.selectedValue
								} 
							    {
							    /*
								{ !this.state.txt ? innerItems.extraName : 
									this.state.txt
								} 
							  	*/
							  	}
						    </Text>

						  }
						</View>
					</TouchableHighlight>
					
					)
				}
				//this.state.propsOptions[i][i2][i3]
				else{
					
					//console.log( "alko huum lää" );
		            //console.log( innerItems.selectedValue );
		            if(innerItems.selectedValue == ""){
						innerItems.selectedValue = false;          	
		            }

					ret.push(
					  <TouchableHighlight
					    onPress={ 
					    	(evt) => {
					    		innerItems.selectedValue = !innerItems.selectedValue;	
					    		this.choiceSelected(key,evt,listItems);	
					    	}
					    } 
					    key={key}>
					    <View style={{...styles.selectableParent,
					    backgroundColor: innerItems.selectedValue ? this.state.activeColor : this.state.inactiveColor,
					    }}>
					      <View style={{margin:15}}>
					        <View style={{...styles.selectableCheckbox,
					        backgroundColor: innerItems.selectedValue ? this.state.activeColor2 : this.state.inactiveColor2,
					        }}>
					          <Image
					            style={{
					              width: 32, 
					              height: 32,
					              opacity: innerItems.selectedValue ? this.state.activeIconOpacity : 0,
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
		      var key = this.state.activeKey + "innerGroupName" + item.id + "_" + itemInner.id;          
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
		          var key = this.state.activeKey + "listsQuestionName|" + item.id + "_" + innerItems.id + "_" + itemInner.id;
		          
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

				  //listataan 1-5 vaihtoehdot
		          let ret2 = []; 
		          let listOfChoices = innerItems.list.map( (selList, i4) => {
		            var key = this.state.activeKey + "selectListChoice|" + item.id + "_" + innerItems.id + "_" + itemInner.id + "_" + i4;
		            
		            /*
		            activeSelection = this.state[key +'-active']; // this.state[key +'-active'];
		            console.log( innerItems.selectedValue );
		            if( (i4 + 1) == innerItems.selectedValue){
						activeSelection = true;        	
		            }
		            */

		            let activeSelection;
		            if(innerItems.selectedValue == ""){
						activeSelection = false;          	
		            }
		            if( (i4 + 1) == innerItems.selectedValue){
						activeSelection = true;        	
		            }

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
		                  backgroundColor: activeSelection ? this.state.activeColor : this.state.inactiveColor,
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

		          var key = this.state.activeKey + "theQuestionChoices|" + item.id + "_" + innerItems.id + "_" + itemInner.id;
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

		  return item

		  var key = this.state.activeKey + "masterView|" + item.id;
		  ret.push(
		    <View key={key}>
		      {ret}
		    </View>
		  ); 
		  }

		});
		
		//console.log(listItems);
		return ret;

	}

	
	render() {
		return (
			<View style={{paddingTop:15}} key="masterView">
				{/*
				<View>
					<Text>
		        		{this.state.activeKey}
		        	</Text>
				</View>

				<TouchableHighlight 
					style={{...styles.button,
		        		backgroundColor: this.state.showDebug ? this.state.activeColor : this.state.inactiveColor,
		        	}} 
		        	onPress={ (evt) => this.debugTexts() }>
		        	<Text>
		        		Debug {this.state.showDebug}
		        	</Text>
		        </TouchableHighlight>
		    	*/}

				{ 	
					this.state.dayNote ?
					//parentista (app.js) daynote nappi painettiin päälle	
				    <View key={this.state.activeKey + "|dayNote"} style={{...styles.freeTextParent,
				    	backgroundColor: this.state.dayNoteIsEditing ? this.state.activeColor3 : this.state.inactiveColor3
					}}>
							<Text style={styles.labelHeader}>
								Päiväkirja {this.state.dateSafe}
							</Text>
							
							{
								this.state.dayNoteIsEditing ? 
								<Text style={styles.textUnderEdit}>
									Muokataan
								</Text>: 
								<Text style={{...styles.textUnderEdit,...styles.textUnderEditSaved}}>
									Talletettu
								</Text>
							}
							

							<TextInput
								autoFocus
								multiline={true}
								value={
									this.state.dayNoteIsEditing ? 
									this.state.dayNotedayNoteTemp : 
									this.state.dayNoteStored
								}
								onChangeText={
									(value) => {
										this.setState({ 
											dayNoteIsEditing: true,
										
											dayNotedayNoteTemp:value
										})
										
										this.updateDayNote(value)
									}
								}
								onBlur={
									() => {
										this.setState({ 
											dayNoteIsEditing: false
										})
									}
								}
							></TextInput>
						
					  
					</View> : null
				}
				<View style={styles.dateChangeParent} key="dateChanger">
					<TouchableHighlight 
						style={{...styles.button, ...styles.inlineSized}} 
			        	onPress={ () => this.changeDate("prev") }>
			        	<Text>
			        		Edellinen
			        	</Text>
			        </TouchableHighlight>
			        <View
			        	style={{...styles.button, ...styles.inlineSized}} >
			        	<Text>
			        		{this.state.dateSafe}
			        	</Text>
			        </View>

			        { this.state.showNextDayButton ?
					<TouchableHighlight 
						style={{...styles.button, ...styles.inlineSized}}  
			        	onPress={ () => this.changeDate("next") }>
			        	<Text>
			        		Seuraava
			        	</Text>
			        </TouchableHighlight> : null
			    	}
				</View>
				{ 	
					this.state.loading ?
					<View style={styles.loadingBar}><Text>Ladataan...</Text></View> :
					//listing starts here
					this.createEl()
				}
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

  loadingBar:{
    fontSize: perfectCheckboxSize,
    padding:padding,
    justifyContent:"center",
    alignItems:"center",
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

  //date change
  dateChangeParent: {
    flex:3,
    flexDirection:'row',
  },
  inlineSized: {
	flex:1,
  },
  buttonOneThird: {
    height:perfectChecbox,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:borderRadius,
    //borderWidth:1,
    //borderColor:'#d6d7da',
    margin:padding,
    backgroundColor: '#FFF',
  },
  textUnderEdit:{
  	fontSize:10,
  	flex:1,
  	backgroundColor:"#ffe69a",
  	position:"absolute",
  	right:0,
  	bottom:0,
  	marginRight:-1,
  	marginBottom:0,
  	padding:5,
  	borderBottomRightRadius:borderRadius,
    textAlign:"center",
    width:80,
  },
  textUnderEditSaved:{
  	backgroundColor:"#bae38b",
  },
});

export default Lister;