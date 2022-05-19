import React, { useState, useEffect, Component } from "react";
import { View, Text, SafeAreaView, Modal, ScrollView, StyleSheet, Image,TouchableOpacity} from "react-native";
import { Button, Divider } from "react-native-elements";
import { collection, query, where, getDoc, doc , deleteDoc, updateDoc } from "firebase/firestore";
import db from "../../firebase";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import EditItems from "./EditItems"

//const q = query(collection(db, "restuarants"));
const styles = StyleSheet.create({
  timeStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  titleStyle: {
    fontSize: 22,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  item: {
    width: '50%' // is 50% of container width
  },
  button: {
    alignItems: 'center',
    margin: 5,
    marginTop: 3,
    width: 100, height: 30,
    backgroundColor: '#4169E1', borderRadius: 20, padding:5,
    Color:"white" ,
    },
});
var allMenuItems = [];

const deleteItems = async(allMenuItems,id) =>{
  console.log(name,id)
  console.log(allMenuItems);
  allMenuItems.splice(id, 1); 
  console.log(allMenuItems);

  const updateRes = doc(db, "restuarants",localStorage.getItem("merchantEditrestaurantID"));
  console.log(localStorage.getItem("merchantEditrestaurantID"));
  await updateDoc(updateRes, {
      menuItems:allMenuItems,
    }) .then(() => {
      alert("delete succesful");
  })
  .catch((err) => {
      alert(err.message)
  })
}

export default class ItemsDetails extends Component{

  getOrder= async () => {
    if(localStorage.getItem('id')){
      const docRef = doc(db, "restuarants",localStorage.getItem('id'));
      var newres = [];
      var newitems= [];
      var newid =[];
      const docSnap = await getDoc(docRef);
      this.setState({
        restaurantName:docSnap.data().restaurantName,
        menuItems:docSnap.data().menuItems,
        id: localStorage.getItem('id'),
      })
    }
    
   
  };
  constructor(){
    super();
    this.getOrder();
    this.state = {
      restaurantName: [],
      menuItems : {},
      modalVisible: false,
      id: {},
    };
    console.log("ok", this.state);
    //console.log("ok",this.state.menuItems[0].menuItems[0].foodName);
  };
  componentDidMount(){
    setTimeout(()=>{
      this.getOrder();
     // allMenuItems = [this.state.menuItems];
      //console.log("okdede",this.state.menuItems);
    },1000)
  }

  render(){
    return(
      <View>

<Modal
        animationType="slide"
        visible={this.state.modalVisible}
        transparent={true}
        presentationStyle={'formSheet'}
        onRequestClose={() => this.setState({modalVisible:false})}
      >
        <View style={{backgroundColor: "white",}}>
          <TouchableOpacity  
            onPress={() =>{
            this.setState({modalVisible:false})
            }} >
            <View>
            <FontAwesome5
              name={'angle-double-down'}
              size={25}
              style={{
                marginBottom: 3,
              }}
            />
            </View>
            </TouchableOpacity>
           
            </View>
        <ScrollView>
        <EditItems/>
        </ScrollView>
      </Modal>


        <View >
        <View style={{backgroundColor: "white",}}>
            </View>
      </View>
      <View>
      <View style={{flexDirection:'row' }}>
             </View>
             <View style={{flexDirection:'row' }}>
             <ScrollView > 
             <View style={{flexDirection:'row' }}>
             <Text style={styles.titleStyle} >  {this.state.restaurantName} restaurant</Text>
             </View>
      {this.state.menuItems && Object.keys(this.state.menuItems).map((v,i) => {
             return (
               <View >
              <View key={i} > 
                 <View>
                 <Text> </Text>
                 <Text style={{ fontWeight: "600", fontSize: 16 }}>  {this.state.menuItems[i].foodName}</Text>
                 <Text style={{ opacity: 0.7, fontSize: 16 }}>  {this.state.menuItems[i].foodDescription}</Text>
                 <Text style={{ opacity: 0.7, fontSize: 16 , color: 'blue'}}>  Price: £{this.state.menuItems[i].foodPrice}</Text>
                 <Image source={{ uri: this.state.menuItems[i].foodImage }} style={{ width: 120, height: 120, padding: 5}} />
                 <View style={{ flexDirection: "row",}}>
                 <View style={styles.button}>
                 <TouchableOpacity  onPress={() => { 
                this.setState({modalVisible:true});
                localStorage.setItem('merchantEditfoodName', this.state.menuItems[i].foodName);
                localStorage.setItem('merchantEditrestaurantName', this.state.restaurantName); 
                localStorage.setItem('merchantEditrestaurantID', this.state.id); 
                localStorage.setItem('merchantEditItemdesc', this.state.menuItems[i].foodDescription); 
                localStorage.setItem('merchantEditItemPrice', this.state.menuItems[i].foodPrice); 
                localStorage.setItem('merchantEdititemID',i)} }>
                  <Text style={{color:'white' }}>Edit Item</Text>
              </TouchableOpacity>
              </View>
              <View style={styles.button}>
              <TouchableOpacity  onPress={() => { deleteItems(this.state.menuItems,i); } }>
                  <Text style={{color:'white'}}>Delete Item</Text>
              </TouchableOpacity>
              </View>
                 <Text> </Text>
                 </View>
                 </View>
                 
             </View>
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
