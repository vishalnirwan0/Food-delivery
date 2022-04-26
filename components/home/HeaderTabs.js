import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function HeaderTabs({ navigation }) {

const [activeTab, setActiveTab] = useState("Sign In")

  return (
    <View style={{ flexDirection: 'row', alignSelf: 'center', paddingTop: 40 }}>
      <HeaderButton
      text="Sign In" 
      btnColor="black" 
      textColor="white" 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      navigation={navigation}
      />
      <HeaderButton
      text="Sign Up" 
      btnColor="white" 
      textColor="black"
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      navigation={navigation}
      />
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
    props.text === "Sign In" ?  navigation.navigate("SignInScreen") : navigation.navigate("SignUpScreen");
  }}
>   
    <Text
    style={{ 
      color: props.activeTab === props.text? 'white': 'black',
      fontSize: 15,
      fontWeight: 900 
      }}>
      {props.text}
    </Text>
</TouchableOpacity>
);
