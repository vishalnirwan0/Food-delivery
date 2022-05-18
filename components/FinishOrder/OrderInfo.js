import React,{Component } from "react";
import { View, Text, SafeAreaView, ScrollView,StyleSheet, } from "react-native";
import StepIndicator from 'react-native-step-indicator';
import { collection, getDoc, doc } from "firebase/firestore";
import db from "../../firebase";

export default class OrderInfo extends Component{
    getinfo = async()=>{
      const docRef = doc(db, "orders", localStorage.getItem('currentOrder'));
      const docSnap = await getDoc(docRef);
      var esitime = docSnap.data().createdAt.toDate()
      esitime = esitime.setHours(esitime.getHours() +  1)
      esitime = new Date(esitime)
      this.setState({
        estime: esitime.toLocaleString(),
        orderId:localStorage.getItem('currentOrder'),
        deliveryAddress: localStorage.getItem('address'),
        username: localStorage.getItem('name'),
        email: localStorage.getItem('userData'),
        resName: docSnap.data().restaurantName,
        total: docSnap.data().total,
      })
    }
    constructor(){
      super(); 
      this.state = ({
          estime: [],
          orderId:[],
          deliveryAddress:[],
          username:[],
          email: [],
          resName: [],
          total :[],
      })
      this.getinfo();
    }
    componentDidMount(){
      setTimeout(()=>{
        this.getinfo();
        //console.log(this.state);
      },1000)
    }
  
    render(){
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        {/* green checkmark */}
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold",alignSelf: 'center', }}>
            Your order at {this.state.resName} has been placed for {this.state.total}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold",alignSelf: 'center', }}>
            Order id: {this.state.orderId}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold",alignSelf: 'center', }}>
            Estimate time:  {this.state.estime}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold",alignSelf: 'center', }}>
            name: {this.state.username}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold",alignSelf: 'center', }}>
            Delivey address: {this.state.deliveryAddress}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold",alignSelf: 'center', }}>
            Email: {this.state.email}
          </Text>

        </View>
        
      </SafeAreaView>
      );
      }
  
  }