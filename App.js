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

const date = new Date();
const options = [
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
const App = () => { 
  return (
    
    <SafeAreaView>
      <ScrollView>
        
        <View style={styles.body}>
          <View style={{width:width, flex:1, backgroundColor: '#5fd2c4'}}>
            <Lister options={options} date={date} /> 
          </View>
          {
          /*
          <View style={{alignSelf: 'stretch', height: 200, backgroundColor: 'red'}}>
            <HeaderElem joku="jotain" /> 
          </View> 
          */
          }
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
