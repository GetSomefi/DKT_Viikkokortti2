//DataFragment.js

import React, { Component } from 'react';

import {
  View,
  Text, 
  StyleSheet
} from 'react-native';

class Lister extends Component {

  constructor(props) {
    super(props);
    let p = this.props.options;
    //console.log(p);

    let listItems = p.map(function(item, i){
      let ret = [];
      console.log('item',item); 
      ret.push(
        <View key="groupId{item.groupId}">
          <Text style={{fontSize: 20}}>{item.groupSafename}</Text>
        </View> 
      ); 

      item.items.map(function(itemInner, i2){
        //console.log('content ', itemInner);
        if(itemInner.hasInner){
          itemInner.innerItems.map(function(innerItems, i3){
            var key = "questionNameInner" + itemInner.innerGroupId + "_" + innerItems.id;
            //console.log('key ', key ); 
            ret.push(
              <View key={key}>
                <Text>#{key}# {innerItems.questionSafename}</Text>
              </View>
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
            itemInner.questions.map(function(innerItems, i3){ 
              var key = "theQuestionName" + innerItems.id + "_" + itemInner.id;
              ret.push(
                <View key={key}>
                  <Text>#{key}# {innerItems.safename}</Text>  
                </View>
                
              );
              innerItems.list.map(function(selList, i4){
                var key = "selList" + i4 + "_" + i3 + "_" + i2;
                ret.push(  
                  <View key={key}>
                    <Text>#{key}# {selList}</Text>  
                  </View>
                );
              });

            });
          }        
        }
      });


      var key = "masterView" + item.groupId;
      return(
        <View key={key}>
          <Text>#{key}# masters</Text>
          {ret}
        </View>
      ); 

    });

    state = {
      listItems : listItems,
    }


  }
  render() {
    return (
      <View>{state.listItems}</View>
    );
  }
}


export default Lister;