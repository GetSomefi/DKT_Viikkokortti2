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

	focusOnAnchorPos = (pos) => {
		let tolerance = 0;
		pos = pos + tolerance;
		console.log('should scroll to', pos); 
		this.scroller.scrollTo({x: 0, y: pos});
	};

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
		console.log( "positions", this.state.positions );
		let listItems = headerPos.map(function(item){
			console.log('h pos', item); 
			ret.push(
				<TouchableHighlight
				//onPress={ (evt) => this.debugTexts() }
				//onPress={ (item) => this.focusOnAnchorPos(item)} >
				onPress={ 
					() => this.focusOnAnchorPos(item)
					//this.focusOnAnchorPos(item)
					/*
					() => {
						console.log('item',item); 
						this.focusOnAnchorPos(item);
					}
					*/
				} >
				
					<Text>{item}</Text>
				</TouchableHighlight>
			);
		});
		return ret;
	}
	render() {
		return (
			<View style={styles.nav}>
				<Text>Tähän alle nav</Text>
				{
					this.createNav()
				}
			</View>
		)	
	}
}

const styles = StyleSheet.create({
  nav:{
  	position:"absolute"
  },
});

export default AnchorNav;