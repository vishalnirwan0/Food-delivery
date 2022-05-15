import React, { useState, useEffect, Component } from "react";
import { View, Text, SafeAreaView, Modal, ScrollView, StyleSheet, Image,TouchableOpacity} from "react-native";
import { Divider } from "react-native-elements";
import { collection, query, where, getDoc,doc } from "firebase/firestore";
import db from "../../firebase";
//import Items from "./Items";



//const q = query(collection(db, "restuarants"));
const styles = StyleSheet.create({
  timeStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },

  titleStyle: {
    fontSize: 20,
    fontWeight: "600",
  },
});
var querySnapshot;

export default class Orders extends Component{
  
  getOrder= async () => {
    const docRef = doc(db, "restuarants",localStorage.getItem('id'));
    var newres = [];
    var newitems= [];
    const docSnap = await getDoc(docRef);
    this.setState({
      restaurantName:docSnap.data().restaurantName,
      menuItems:docSnap.data().menuItems,
    })
   
  };
  constructor(){
    super();
    this.getOrder();
    this.state = {
      restaurantName: [],
      menuItems : {},
    };
    console.log("ok",this.state);
    //console.log("ok",this.state.menuItems[0].menuItems[0].foodName);
  };
  componentDidMount(){
    setTimeout(()=>{
      this.getOrder();
      console.log("ok",this.state);
    },1000)
  }

  render(){
    return(
      <View>
        <View >
        <View style={{backgroundColor: "white",}}>
            </View>
      </View>
      <View>
      <View style={{flexDirection:'row' }}>
             </View>
             <View style={{flexDirection:'row' }}>
             <ScrollView horizontal={true} > 
      {this.state.menuItems && Object.keys(this.state.menuItems).map((v,i) => {
             return (
              <View key={i} style={{flexDirection:'row' }}>
  
                 <View>
                 <Text style={{ fontWeight: "600", fontSize: 16 }}>{this.state.menuItems[i].foodName}</Text>
                 <Text style={{ opacity: 0.7, fontSize: 16 }}>{this.state.menuItems[i].foodPrice}</Text>
                 </View>
                   
             
             <Divider width={1} />
             </View>
             )
             
          })
          }
          </ScrollView>
             </View>

             </View>
      </View>
  )
  }  
    
};
