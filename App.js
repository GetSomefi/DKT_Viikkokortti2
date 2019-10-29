import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

import MoveableButton from './components/MoveableButton.js';
import HeaderElem from './components/HeaderElem.js'; 
import Lister from './components/DataFragment.js'; 

const date = new Date();
const options = [
  {
    note:true,
    safename:"Päiväkirja",
    extraName:"",
    selectedValue:""
  },
  //käyttäytyminen
  {
    id:0,
    groupSafename:"Käyttäytyminen",
    items:[
      {
        id: 0, 
        type: "selection",
        questionSafename:"Itsensä vahingoittaminen",
        items:[
          {
            id: 0,
            safename:"Ajatukset",
            extraName:"",
            list:[1,2,3,4,5],
            selectedValue:""
          },
          {
            id: 1,
            safename:"Teot",
            extraName:"",
            list:[1,2,3,4,5],
            selectedValue:""
          }
        ]     
      },
      {
        id: 1, 
        type: "selection",
        questionSafename:"Itsemurha aikeet",
        items:[
          {
            id: 0,
            safename:"Ajatukset",
            extraName:"",
            list:[1,2,3,4,5],
            selectedValue:""
          },
          {
            id: 1,
            safename:"Teot",
            extraName:"",
            list:[1,2,3,4,5],
            selectedValue:""
          }
        ] 
      },
      {
        hasInner:true,
        id:0,
        groupSafename:"",
        items:[
          {
            id:2,
            type:"selectone",
            questionSafename:"Alkoholi",
            extraName:"",
            selectedValue:""
          },
          {
            id:3,
            type:"selectone",
            questionSafename:"Huumeet",
            extraName:"",
            selectedValue:""
          },
          {
            id:4,
            type:"selectone",
            questionSafename:"Lääkehoito",
            extraName:"",
            selectedValue:""
          },
          {
            id:5,
            type:"selectone",
            questionSafename:"Poissaolo sovitusta menosta",
            extraName:"",
            selectedValue:""
          },
          {
            id:6,
            type:"selectone",
            questionSafename:"Maltin menetys",
            extraName:"",
            selectedValue:""
          },
          {
            id:7,
            type:"selectone",
            questionSafename:"Ahminta / syömättömyys",
            extraName:"",
            selectedValue:""
          },
          {
            id:8,
            type:"selectone",
            questionSafename:"Oksentaminen",
            extraName:"",
            selectedValue:""
          },
          {
            id:9,
            type:"selectone",
            questionSafename:"Riskiseksi",
            extraName:"",
            selectedValue:""
          },
          {
            id:10,
            type:"selectone",
            questionSafename:"Valehtelu",
            extraName:"",
            selectedValue:""
          },
          {
            id:11,
            type:"freetext",
            questionSafename:"Vapaa teksti",
            extraName:"Kirjoita tähän",
            selectedValue:""
          }
        ]
      }
    ]
  },

  //tunteet
  {
    id:1,
    groupSafename:"Tunteet",
    items:[
      {
        id: 0, 
        type: "selection",
        questionSafename:"",
        items:[
          {
            id: 0,
            safename:"Viha",
            extraName:"",
            list:[1,2,3,4,5],
            selectedValue:""
          },
          {
            id: 1,
            safename:"Pelko",
            extraName:"",
            list:[1,2,3,4,5],
            selectedValue:""
          },
          {
            id: 2,
            safename:"Ahdistus",
            extraName:"",
            list:[1,2,3,4,5],
            selectedValue:""
          },
          {
            id: 3,
            safename:"Ilo",
            extraName:"",
            list:[1,2,3,4,5],
            selectedValue:""
          },
          {
            id: 4,
            safename:"Suru",
            extraName:"",
            list:[1,2,3,4,5],
            selectedValue:""
          },
          {
            id: 5,
            safename:"Häpeä",
            extraName:"",
            list:[1,2,3,4,5],
            selectedValue:""
          }
        ]     
      },
    ]
  },

  //taidot
  {
    id:2,
    groupSafename:"Taidot",
    items:[
      {
        hasInner:true,
        id:0,
        groupSafename:"Tietoisuustaidot",
        items:[
          {
            id: 0, 
            type: "selectone",
            questionSafename:"Viisasmieli",
            extraName:"",
            selectedValue:""
          },
          {
            id: 1, 
            type: "selectone",
            questionSafename:"Havainnointi (huomio mitä tapahtui)",
            extraName:"Mitä -taidot",
            selectedValue:""
          },
          {
            id: 2, 
            type: "selectone",
            questionSafename:"Kuvailu (anna havaintoihin sanat)",
            extraName:"",
            selectedValue:""
          },
          {
            id: 3, 
            type: "selectone",
            questionSafename:"Osallistuminen (heittäydy kokemukseesi)",
            extraName:"",
            selectedValue:""
          },
          {
            id: 4, 
            type: "selectone",
            questionSafename:"Tuomitsemattomuus",
            extraName:"Miten -taidot",
            selectedValue:""
          },
          {
            id: 5, 
            type: "selectone",
            questionSafename:"Asia kerrallaan",
            extraName:"",
            selectedValue:""
          },

        ]
      },
      {
        hasInner:true,
        id:1,
        groupSafename:"Ahdingon sietämisen taidot",
        items:[
          {
            id: 0, 
            type: "selectone",
            questionSafename:"STOP",
            extraName:"",
            selectedValue:""
          },
          {
            id: 1, 
            type: "selectone",
            questionSafename:"Plussat ja miinukset",
            extraName:"",
            selectedValue:""
          },
          {
            id: 2, 
            type: "selectone",
            questionSafename:"TIPP",
            extraName:"",
            selectedValue:""
          },
          {
            id: 3, 
            type: "selectone",
            questionSafename:"Huomion siirtäminen muualle",
            extraName:"",
            selectedValue:""
          },
          {
            id: 4, 
            type: "selectone",
            questionSafename:"Itsensä rauhoittaminen",
            extraName:"",
            selectedValue:""
          },
          {
            id: 5, 
            type: "selectone",
            questionSafename:"Hetken parantaminen",
            extraName:"",
            selectedValue:""
          },
          {
            id: 6, 
            type: "selectone",
            questionSafename:"Radikaali hyväksyminen",
            extraName:"",
            selectedValue:""
          },
          {
            id: 7, 
            type: "selectone",
            questionSafename:"Riippuvuuksien hallinta",
            extraName:"",
            selectedValue:""
          }
        ]
      },
      {
        hasInner:true,
        id:2,
        groupSafename:"Tunteiden säätelyn taidot",
        items:[
          {
            id: 0, 
            type: "selectone",
            questionSafename:"Tunteiden ymmärtäminen ja kuvaaminen",
            extraName:"",
            selectedValue:""
          },
          {
            id: 1, 
            type: "selectone",
            questionSafename:"Toimiminen toisin kuin tunne yllyttää",
            extraName:"",
            selectedValue:""
          },
          {
            id: 2, 
            type: "selectone",
            questionSafename:"Lyhyen ja pitkän aikavälin tavoitteet",
            extraName:"",
            selectedValue:""
          },
          {
            id: 3, 
            type: "selectone",
            questionSafename:"Hallinnan tunteen kehittäminen",
            extraName:"",
            selectedValue:""
          },
          {
            id: 4, 
            type: "selectone",
            questionSafename:"PLEASE",
            extraName:"Terveydestä huolehtiminen",
            selectedValue:""
          }
        ]
      },
      {
        hasInner:true,
        id:3,
        groupSafename:"Vuorovaikutustaidot",
        items:[
          {
            id: 0, 
            type: "selectone",
            questionSafename:"DEAR MAN",
            extraName:"Saadaksesi mitä haluat",
            selectedValue:""
          },
          {
            id: 1, 
            type: "selectone",
            questionSafename:"GIVE",
            extraName:"Suhteen muuttaminen paremmaksi",
            selectedValue:""
          },
          {
            id: 2, 
            type: "selectone",
            questionSafename:"FAST",
            extraName:"Itsekunnioituksen säilyttäminen",
            selectedValue:""
          },
          {
            id: 3, 
            type: "selectone",
            questionSafename:"Uusien ihmissuhteiden luominen ja haitallisten suhteiden päättäminen",
            extraName:"",
            selectedValue:""
          },
          {
            id: 4, 
            type: "selectone",
            questionSafename:"Dialektiikka",
            extraName:"",
            selectedValue:""
          },
          {
            id: 5, 
            type: "selectone",
            questionSafename:"Validointi",
            extraName:"",
            selectedValue:""
          },
          {
            id: 6, 
            type: "selectone",
            questionSafename:"Käytöksen muuttamisen keinot",
            extraName:"",
            selectedValue:""
          }
        ]
      }
    ]
  },

];

//alignSelf: 'stretch' = fullwidth
//const App = () => { 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayNoteOn:false
    };
  }

  toggleDayNote = () => {
    let toggler = !this.state.dayNoteOn; 
    this.setState({ 
      dayNoteOn: toggler 
    });
    console.log('day note', this.state.dayNoteOn);   
  }

  updateDayNoteHasContent = (newState) => {
    console.log('day not content updated', newState); 
    this.setState({
      dayNoteHasContent:newState
    });
  }

  render(){
    return (
      
      <SafeAreaView  style={styles.height}>
                   
        <View style={styles.body}>
          <View style={styles.bodyInner}>
            {/*
            <View style={{padding:15}}>
              <Text>
                Muutosehdotuksia: {"\n"}
                [_] Päiväkirja-nappiin täppä jos sisältöä
              </Text>
              <Text>
                {
                  this.state.dayNoteOn ? "päällä" : "pois"
                }
              </Text>
            </View>
            */}
            <Lister 
              options={options} 
              date={date} 
              dayNote={this.state.dayNoteOn}
              onRef={ref => (this.dayNoteUpdater = ref)}
              dayNoteUpdater = {this.updateDayNoteHasContent} 
            />  
          </View>
          { 
          /*
          <View style={{alignSelf: 'stretch', height: 200, backgroundColor: 'red'}}>
            <HeaderElem joku="jotain" /> 
          </View> 
          */
          }
        </View> 
        
        <View style={styles.headerBar}>
            <View style={{flex:1}}><Text></Text></View>
            <View style={{flex:1}}><Text></Text></View>
            <TouchableHighlight 
              onPress={ 
                (evt) => { 
                  this.toggleDayNote(); 
                }
              }  
              style={styles.headerBarButton}>             
              <View style={{justifyContent:"center"}}>
                {
                  this.state.dayNoteHasContent ? 
                  <View style={styles.activeCircle}></View> : null
                }
                <Text style={styles.headerBarButtonText}>
                  Päiväkirja
                 </Text> 
              </View> 
            </TouchableHighlight>
        </View>

      </SafeAreaView>
    )
  }
};

let paddingTop = 80;
const styles = StyleSheet.create({
  body: {
    flex:1,
    flexDirection:'column',
    backgroundColor: '#FFF',
    borderColor: '#d6d7da',
    paddingTop:paddingTop,
  },
  bodyInner:{
    width:width, 
    flex:1, 
    backgroundColor: '#F5F5F6'   
  },
  headerBar:{
    width:width,
    backgroundColor:'#135b99',
    position:'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf:'flex-end'
  },
  headerBarButton:{
    flex:1,
    padding:15,
    backgroundColor:'#5388ca',
    borderRadius:5,
    margin:15,
  },
  headerBarButtonText:{
    alignSelf: 'center',
    color:'#FFF'
  },
  height:{
    height:height,
  },
  highlightedText: {
    color: 'red',
  },
  activeCircle:{
    alignSelf: 'flex-start',
    borderRadius:10,
    width:10,
    height:10,
    backgroundColor:"#cefff6",
    position:"absolute",
    marginLeft:8,
  }
});
/*
https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=135b99&secondary.color=6734ff
<!--?xml version="1.0" encoding="UTF-8"?-->
<resources>
  Blue
  <color name="primaryColor">#135b99</color>
  <color name="primaryLightColor">#5388ca</color>
  <color name="primaryDarkColor">#00326a</color>
  PurplishBlue
  <color name="secondaryColor">#6734ff</color>
  <color name="secondaryLightColor">#a265ff</color>
  <color name="secondaryDarkColor">#1200ca</color>

  <color name="primaryTextColor">#ffffff</color>
  <color name="secondaryTextColor">#ffffff</color>
</resources>
*/

export default App;
