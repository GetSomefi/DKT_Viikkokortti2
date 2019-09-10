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
        hasInner:true,
        innerGroupId:0,
        groupSafename:"",
        innerItems:[
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
          },
          {
            id:4,
            type:"selectone",
            questionSafename:"Lääkehoito",
            extraName:"",
          },
          {
            id:5,
            type:"selectone",
            questionSafename:"Poissaolo sovitusta menosta",
            extraName:"",
          },
          {
            id:6,
            type:"selectone",
            questionSafename:"Maltin menetys",
            extraName:"",
          },
          {
            id:7,
            type:"selectone",
            questionSafename:"Ahminta / syömättömyys",
            extraName:"",
          },
          {
            id:8,
            type:"selectone",
            questionSafename:"Oksentaminen",
            extraName:"",
          },
          {
            id:9,
            type:"selectone",
            questionSafename:"Riskiseksi",
            extraName:"",
          },
          {
            id:10,
            type:"selectone",
            questionSafename:"Valehtelu",
            extraName:"",
          },
          {
            id:11,
            type:"freetext",
            questionSafename:"Vapaa teksti",
            extraName:"Kirjoita tähän",
          }
        ]
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
        type: "selection",
        questionSafename:"",
        questions:[
          {
            id: 0,
            safename:"Viha",
            extraName:"",
            list:[1,2,3,4,5]
          },
          {
            id: 1,
            safename:"Pelko",
            extraName:"",
            list:[1,2,3,4,5]
          },
          {
            id: 2,
            safename:"Ahdistus",
            extraName:"",
            list:[1,2,3,4,5]
          },
          {
            id: 3,
            safename:"Ilo",
            extraName:"",
            list:[1,2,3,4,5]
          },
          {
            id: 4,
            safename:"Suru",
            extraName:"",
            list:[1,2,3,4,5]
          },
          {
            id: 5,
            safename:"Häpeä",
            extraName:"",
            list:[1,2,3,4,5]
          }
        ]     
      },
    ]
  },

  //taidot
  {
    groupId:3,
    groupSafename:"Taidot",
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
          {
            id: 5, 
            type: "selectone",
            questionSafename:"Asia kerrallaan",
            extraName:"",
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
          {
            id: 1, 
            type: "selectone",
            questionSafename:"Plussat ja miinukset",
            extraName:"",
          },
          {
            id: 2, 
            type: "selectone",
            questionSafename:"TIPP",
            extraName:"",
          },
          {
            id: 3, 
            type: "selectone",
            questionSafename:"Huomion siirtäminen muualle",
            extraName:"",
          },
          {
            id: 4, 
            type: "selectone",
            questionSafename:"Itsensä rauhoittaminen",
            extraName:"",
          },
          {
            id: 5, 
            type: "selectone",
            questionSafename:"Hetken parantaminen",
            extraName:"",
          },
          {
            id: 6, 
            type: "selectone",
            questionSafename:"Radikaali hyväksyminen",
            extraName:"",
          },
          {
            id: 7, 
            type: "selectone",
            questionSafename:"Riippuvuuksien hallinta",
            extraName:"",
          }
        ]
      },
      {
        hasInner:true,
        innerGroupId:2,
        groupSafename:"Tunteiden säätelyn taidot",
        innerItems:[
          {
            id: 0, 
            type: "selectone",
            questionSafename:"Tunteiden ymmärtäminen ja kuvaaminen",
            extraName:"",
          },
          {
            id: 1, 
            type: "selectone",
            questionSafename:"Toimiminen toisin kuin tunne yllyttää",
            extraName:"",
          },
          {
            id: 2, 
            type: "selectone",
            questionSafename:"Lyhyen ja pitkän aikavälin tavoitteet",
            extraName:"",
          },
          {
            id: 3, 
            type: "selectone",
            questionSafename:"Hallinnan tunteen kehittäminen",
            extraName:"",
          },
          {
            id: 4, 
            type: "selectone",
            questionSafename:"PLEASE",
            extraName:"Terveydestä huolehtiminen",
          }
        ]
      },
      {
        hasInner:true,
        innerGroupId:3,
        groupSafename:"Vuorovaikutustaidot",
        innerItems:[
          {
            id: 0, 
            type: "selectone",
            questionSafename:"DEAR MAN",
            extraName:"Saadaksesi mitä haluat",
          },
          {
            id: 1, 
            type: "selectone",
            questionSafename:"GIVE",
            extraName:"Suhteen muuttaminen paremmaksi",
          },
          {
            id: 2, 
            type: "selectone",
            questionSafename:"FAST",
            extraName:"Itsekunnioituksen säilyttäminen",
          },
          {
            id: 3, 
            type: "selectone",
            questionSafename:"Uusien ihmissuhteiden luominen ja haitallisten suhteiden päättäminen",
            extraName:"",
          },
          {
            id: 4, 
            type: "selectone",
            questionSafename:"Dialektiikka",
            extraName:"",
          },
          {
            id: 5, 
            type: "selectone",
            questionSafename:"Validointi",
            extraName:"",
          },
          {
            id: 6, 
            type: "selectone",
            questionSafename:"Käytöksen muuttamisen keinot",
            extraName:"",
          }
        ]
      }
    ]
  },

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
