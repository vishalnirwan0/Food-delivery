import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function BottomTabs({ navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
      }}
    >
      <Icon icon="home" text="Home" navigation={navigation}/>
      <Icon icon="search" text="Browse" navigation={navigation}/>
      <Icon icon="shopping-bag" text="Grocery" navigation={navigation}/>
      <Icon icon="receipt" text="Orders" navigation={navigation}/>
      <Icon icon="user" text="Account" navigation={navigation}/>
      {localStorage.getItem("userData") ?(<Icon icon="sign-out-alt" text="Log out" navigation={navigation}/>):(<></>)}
    </View>
  );
}

const Icon = ({ navigation,...props}) => (
  <TouchableOpacity>
    <View>
      <FontAwesome5
        name={props.icon}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
        onPress={() =>{
          if(props.text == "Log out"){
            localStorage.clear();
            sessionStorage.clear();
            navigation.navigate("Home");
            window.location.reload();
          }
          else if(props.text == "Home"){
            navigation.navigate("Home");
          }
          else if(props.text == "Orders"){
            if(localStorage.getItem('userData')){
              navigation.navigate("HistoryOrder");
            }else{
              navigation.navigate("SignInScreen")
            }
          }
          else if(props.text == "Account"){
            if(localStorage.getItem('userData')){
              navigation.navigate("Account");
            }else{
              navigation.navigate("SignInScreen")
            }
          }
        }}
      />
      <Text>{props.text}</Text>
    </View>
  </TouchableOpacity>
);