import React, { useState, useEffect, Component } from "react";
import { View, Text, SafeAreaView, Modal, ScrollView, StyleSheet, Image,TouchableOpacity , Platform,TextInput } from "react-native";
import { Divider } from "react-native-elements";
import { collection, query, where, getDocs,updateDoc, deleteDoc, doc ,getDoc} from "firebase/firestore";
import db from "../../firebase";
import DeliveryPerson from "./DeliveryPerson";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import LottieView from "lottie-react-native";


const q = query(collection(db, "restuarants"), where("restaurantName", "==", localStorage.getItem("merchantEditrestaurantName")));
var querySnapshot;
var allMenuItems = [];

export default class EditItems extends Component{
  
    getOrder= async () => {
        const docRef = doc(db, "restuarants",localStorage.getItem('id'));
        var newres = [];
        var newitems= [];
        const docSnap = await getDoc(docRef);
        this.setState({
            menuItems:docSnap.data().menuItems,
        })
  };
  constructor(){
    super();
    this.state = {
      restaurantName: {},
      menuItems : {},
    };
    this.getOrder();
   // console.log('ok');
   // console.log(this.state);
  };
  componentDidMount(){
    setTimeout(()=>{
      this.getOrder();
      allMenuItems = [this.state.menuItems];
      console.log('MenuItems',this.state.menuItems);
      console.log('allMenuItems',allMenuItems);
      console.log('ResturantID',localStorage.getItem("merchantEditrestaurantID"))
    },1000)
  }
  updateItems = async() =>{
    //console.log(allMenuItems[0][localStorage.getItem("merchantEdititemID")].foodDescription);
    //console.log(allMenuItems[0][localStorage.getItem("merchantEdititemID")].foodPrice);
    //console.log(allMenuItems[0]);
    const updateRes = doc(db, "restuarants",localStorage.getItem("merchantEditrestaurantID"));
    console.log(localStorage.getItem("merchantEditrestaurantID"));
    await updateDoc(updateRes, {
        menuItems:allMenuItems[0],
      }) .then(() => {
        alert("Item update succesful");
    })
    .catch((err) => {
        alert(err.message)
    })
  }
  itemDescriptionInputChange = (text) =>{
  allMenuItems[0][localStorage.getItem("merchantEdititemID")].foodDescription = text;
  }
  itempriceInputChange = (text) =>{
    allMenuItems[0][localStorage.getItem("merchantEdititemID")].foodPrice = text;
  }

  render(){
    return(
        <SafeAreaView style={{ flex: 10, backgroundColor: "white" }}>
        {/* green checkmark */}
        <View>
          <ScrollView>
          <View>
          <Text style={{  fontSize: 20 , marginBottom: 5 , textAlign:'center'}}> Edit Food Information </Text>
            <Text style={{ opacity: 0.7, fontSize: 20 }}> Food Name - {localStorage.getItem("merchantEditfoodName")}</Text>
            <Text style={{ opacity: 0.7, fontSize: 12 }}> Please note; Food name cannot change. It requires to add new food instead. </Text>
            <Text style={[styles.text_footer, {
                  marginTop: 10,
                  marginBottom: 8
              }]}>Food description</Text>
              <View style={styles.action}>
                  <FontAwesome5 
                      name="location-arrow"
                      color="#05375a"
                      size={10}
                  />
                  <TextInput 
                      value={localStorage.getItem("merchantEditItemdesc")}
                      style={styles.textInput}
                      autoCapitalize="none"
                      onChangeText={(val) => this.itemDescriptionInputChange(val)}
                  />
              </View>
  
              <Text style={[styles.text_footer, {
                  marginTop: 10,
                  marginBottom: 8
              }]}>Food Price</Text>
              <View style={styles.action}>
                  <FontAwesome5 
                      name="location-arrow"
                      color="#05375a"
                      size={10}
                  />
                  <TextInput 
                     // placeholder="Food Price" // merchantEditItemPrice
                      value={localStorage.getItem("merchantEditItemPrice")}
                      style={styles.textInput}
                      autoCapitalize="none"
                      onChangeText={(val) => this.itempriceInputChange(val)}
                  />
              </View>
              <View style={styles.button}>
                  <TouchableOpacity
                      style={styles.signIn}
                      onPress={() => this.updateItems()}
                  >
                      <Text style={[styles.textSign, {
                          color:'#000'
                      }]}>Submit</Text>
                  </TouchableOpacity>
              </View>
            </View>
            <LottieView
              style={{ height: 400, alignSelf: "center" }}
              source={require("../../assets/animations/cooking.json")}
              // autoPlay
              speed={0.5}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
  )
  }  
    
};

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#000000'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 40
    },
    footer: {
        flex: 9,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 8,
        marginLeft: 5,
        marginRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    AddItemCol: {
        flex: 1,
        width: '25%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 1,
        paddingRight: 1,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 13,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 30
    },
    buttonAddItems: {
        alignItems: 'center',
        flex: 1,
        width: '25%',
    },
    signIn: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 15
    },
    color_textPrivate: {
        color: 'grey'
    }
  });