import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { render } from 'react-dom';

export default function HeaderTabs({ navigation }) {

  return (
    <View style={{ flexDirection: 'row', alignSelf: 'center', paddingTop: 40 }}>
    <Text
    style={{
      fontSize: 25,
      fontWeight: "300",
      marginTop: 10,
      marginHorizontal: 15,
    }}
  >
    Welcome!
  </Text>
    <Text
    style={{
      fontSize: 25,
      fontWeight: "300",
      marginTop: 10,
      marginHorizontal: 15,
    }}
  >
    {localStorage.getItem("name")}
  </Text>
    </View>
  )
}

const HeaderButton = ({navigation, ...props}) => (
  // TouchableOpacity is used as a button and onlcick as well
<TouchableOpacity
style={{
  backgroundColor: props.activeTab === props.text? 'black': 'white',
  paddingVertical: 6,
  paddingHorizontal: 16,
  borderRadius: 30,
  }}
  onPress={() => {
    props.setActiveTab(props.text)
    console.log(">>>>>>>>>>. props.text >>>>>", props.text);
    localStorage.clear();
    navigation.navigate("Home");
    window.location.reload()
  }}
>   
    <Text
    style={{ 
      color: props.activeTab === props.text? 'white': 'black',
      fontSize: 15,
      fontWeight: 800 
      }}>
      {props.text}
    </Text>
</TouchableOpacity>
);
