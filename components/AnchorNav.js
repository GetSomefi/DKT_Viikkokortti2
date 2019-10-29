//AnchorNav.js
import React, { Component } from 'react';

import {
  View,
  Text, 
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Image,
  TextInput,
  UseEffect,
  ScrollView
} from 'react-native';

class AnchorNav extends Component {
	constructor(props) {
		super(props);

		this.state = {
			positions:this.props.positions,
		}
	}

	componentDidMount(){
		this.createNav();
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

	createNav = () => {
		let ret = [];

		let headerPos = this.state.positions;
		//console.log( "positions", this.state.positions );
		//let listItems = headerPos.map(function(item){ // ei näin! koska tuo this.focusOnAnchorPos(item) ei näy sisällä(undefined)!
		let listItems = headerPos.map((item,i) => { // vaan näin
			//console.log('h pos', item); 
			let key = "navBtn|" + i;
			ret.push(
				<TouchableHighlight
				key={key}
				style={{...styles.navButton}}
				onPress={
					() => this.props.parentReference(item[0])
				} >
				
					<Text style={styles.navButtonText}>{item[1]}</Text>
				</TouchableHighlight>
			);
		});
		return ret;
	}
	render() {
		return (
			<View>
				<View style={styles.navInner}>
					{
						this.createNav()
					}
				</View>
			</View>
		)	
	}
}

let perfectCheckboxSize = 50;
let padding = 15;
let borderRadius = 5;

let perfectChecbox = perfectCheckboxSize;
const styles = StyleSheet.create({
  navInner:{
  	flex:1,
  	flexDirection: 'row',
  },
  //button
  navButton: {
  	flex:1,
    height:perfectChecbox,
    borderRadius:borderRadius,
    margin:padding,
    padding:padding,
    backgroundColor: '#FFF',
  },
  navButtonText: {
  	fontSize:10,
  	textAlign:"center",
  	justifyContent:"center",
  	lineHeight:20,
  },
});

export default AnchorNav;