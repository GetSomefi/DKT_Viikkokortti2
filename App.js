import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions
} from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

import MoveableButton from './components/MoveableButton.js';
import HeaderElem from './components/HeaderElem.js'; 
import Lister from './components/DataFragment.js'; 


var options = [

  //käyttäytyminen
  {
    groupId:1,
    groupSafename:"Käyttäytyminen",
    items:[
      {
        id: 0, 
        type: "selection",
        questionSafename:"Itsensä vahingoittaminen",
        questions:[
          {
            id: 0,
            safename:"Ajatukset",
            extraName:"",
            list:[1,2,3,4,5]
          },
          {
            id: 1,
            safename:"Teot",
            extraName:"",
            list:[1,2,3,4,5]
          }
        ]     
      },
      {
        id: 1, 
        type: "selection",
        questionSafename:"Itsemurha aikeet",
        questions:[
          {
            id: 0,
            safename:"Ajatukset",
            extraName:"",
            list:[1,2,3,4,5]
          },
          {
            id: 1,
            safename:"Teot",
            extraName:"",
            list:[1,2,3,4,5]
          }
        ] 
      },
      {
        id:2,
        type:"selectone",
        questionSafename:"Alkoholi",
        extraName:"",
      },
      {
        id:3,
        type:"selectone",
        questionSafename:"Huumeet",
        extraName:"",
      }
    ]
  },

  //tunteet
  {
    groupId:2,
    groupSafename:"Tunteet",
    items:[
      {
        id: 0, 
        type: "scale",
        questionSafename:"Viha",
        extraName:"",
        list:[1,2,3,4,5]
      }
    ]
  },

  //taidot
  {
    groupId:3,
    groupSafename:"Tunteet",
    items:[
      {
        hasInner:true,
        innerGroupId:0,
        groupSafename:"Tietoisuustaidot",
        innerItems:[
          {
            id: 0, 
            type: "selectone",
            questionSafename:"Viisasmieli",
            extraName:"",
          },
          {
            id: 1, 
            type: "selectone",
            questionSafename:"Havainnointi (huomio mitä tapahtui)",
            extraName:"Mitä -taidot",
          },
          {
            id: 2, 
            type: "selectone",
            questionSafename:"Kuvailu (anna havaintoihin sanat)",
            extraName:"",
          },
          {
            id: 3, 
            type: "selectone",
            questionSafename:"Osallistuminen (heittäydy kokemukseesi)",
            extraName:"",
          },
          {
            id: 4, 
            type: "selectone",
            questionSafename:"Tuomitsemattomuus",
            extraName:"Miten -taidot",
          },
        ]
      },
      {
        hasInner:true,
        innerGroupId:1,
        groupSafename:"Ahdingon sietämisen taidot",
        innerItems:[
          {
            id: 0, 
            type: "selectone",
            questionSafename:"STOP",
            extraName:"",
          },
        ]
      }
    ]
  }

];

//alignSelf: 'stretch' = fullwidth
const App = () => { 
  return (
    
    <SafeAreaView>
      <ScrollView>
        
        <View style={styles.body}>
          <View style={{alignSelf: 'stretch', height: 50, backgroundColor: 'powderblue'}}>
            <Text style={styles.highlightedText}>Moi2</Text>
          </View>
          <View style={{alignSelf: 'stretch', height: 50, backgroundColor: 'blue'}}>
            <HeaderElem joku="jotain" /> 
          </View> 
          <View style={{width:width, flex:1, backgroundColor: '#5fd2c4'}}>
            <Lister options={options} /> 
          </View>
          <View style={{alignSelf: 'stretch', height: 200, backgroundColor: 'red'}}>
            <HeaderElem joku="jotain" /> 
          </View>  
        </View> 

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex:1,
    flexDirection:'column',
    backgroundColor: '#666',
    borderColor: '#d6d7da'
  },
  highlightedText: {
    color: 'red',
  },
});

export default App;
