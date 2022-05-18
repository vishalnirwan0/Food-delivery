import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function MerchantBottomTabs({ navigation }) {
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
      <Icon icon="photo-video" text="Manage restuant's blackground" navigation={navigation}/>
      <Icon icon="clipboard-list" text="Add food items" navigation={navigation}/>
      <Icon icon="receipt" text="Manage orders" navigation={navigation}/>
      {/* <Icon icon="user" text="Account" navigation={navigation}/> */}
      {localStorage.getItem("userData") ?(<Icon icon="sign-out-alt" text="Log out" navigation={navigation}/>):(<></>)}
    </View>
  );
}

const Icon = ({ navigation,...props}) => (
  <TouchableOpacity onPress={() =>{
    if(props.text == "Log out"){
      localStorage.clear();
      sessionStorage.clear();
      navigation.navigate("Home");
      window.location.reload();
    }
    else if(props.text == "Add food items"){
      navigation.navigate("MerchantMenu");
    }
    else if(props.text == "Home"){
      navigation.navigate("MerchantHome");
    }
    else if(props.text == "Manage orders"){
      if(localStorage.getItem('res')){
        navigation.navigate("MerchantOrders");
      }else{
        navigation.navigate("MerchantMenu")
      }
    }
    else if(props.text == "Account"){
      if(localStorage.getItem('userData')){
        navigation.navigate("Account");
      }else{
        navigation.navigate("SignInScreen")
      }
    }
  }}>
    <View>
      <FontAwesome5
        name={props.icon}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
        
      />
      <Text>{props.text}</Text>
    </View>
  </TouchableOpacity>
);