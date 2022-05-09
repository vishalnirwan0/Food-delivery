import React, { useState, useEffect, Component } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image,} from "react-native";
import { Divider } from "react-native-elements";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../firebase";
import imgshop from '../../assets/icons/shop.png';
import OrderItem from "../restaurantDetail/OrderItem";

const q = query(collection(db, "orders"), where("userid", "==", localStorage.getItem("userId")));
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
const getOrder= async () => {
  var newres = [];
  var newtime=[];
  var newitems= [];
  var newprice =[];
  querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
  //doc.data() is never undefined for query doc snapshots
  console.log(doc.data());
  newres.push({'res' : doc.data().restaurantName});
  newitems.push({'items': doc.data().items});
  newtime.push({'time': doc.data().createdAt.toDate().toLocaleString()});
  newprice.push({'total': doc.data().total})
 });
 sessionStorage.setItem('resName',JSON.stringify(newres));
 sessionStorage.setItem('items',JSON.stringify(newitems));
 sessionStorage.setItem('time', JSON.stringify(newtime));
 sessionStorage.setItem('total', JSON.stringify(newprice));
};
export default class Orders extends Component{
  //const [restaurants,setRes] = useState([]);
  
  constructor(){
    super();
    getOrder();
    this.state = {
      restaurantName: JSON.parse(sessionStorage.getItem('resName')),
      items : JSON.parse(sessionStorage.getItem('items')),
      time : JSON.parse(sessionStorage.getItem('time')),
      total: JSON.parse(sessionStorage.getItem('total')),
    };
    console.log('ok');
    console.log(this.state);
  };
  componentDidMount(){
    setTimeout(()=>{
      this.setState({
        restaurantName: JSON.parse(sessionStorage.getItem('resName')),
        items : JSON.parse(sessionStorage.getItem('items')),
        time : JSON.parse(sessionStorage.getItem('time')),
        total: JSON.parse(sessionStorage.getItem('total')),
    });
      console.log(this.state);
    },1000)
  }

  render(){
    return(
      <View>
          {this.state.restaurantName &&  this.state.restaurantName.map((v,i) => {
             return (
              <View key={i}>
             <View style={{flexDirection:'row' }}>
             <Image source={imgshop} 
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 8,
                    }}/>
             <Text style={styles.titleStyle} >{v.res}</Text>
             </View>
             <View style={{flexDirection:'row' }}>
             <ScrollView horizontal={true} > 
               {this.state.items[i].items.map((v1,i1) =>{
                 return (
                   <View key = {i1} style={{flexDirection:'row' }}>
                      <Image  source = {{uri: v1.image}}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 8,
                          marginRight: 10,
                          marginLeft: 10,
                          margin: 10
                        }}
                 />
                 <View>
                 <Text style={{ fontWeight: "600", fontSize: 16 }}>{v1.title}</Text>
                 <Text style={{ opacity: 0.7, fontSize: 16 }}>{v1.price}</Text>
                 </View>
                   </View>
                 )
               })}
             </ScrollView>
             <View>
             <Text style={styles.timeStyle}>{this.state.time[i].time}</Text>
             <Text style={styles.timeStyle}>{this.state.total[i].total}</Text>
             </View>
             </View>
             <Divider width={1} />
             </View>
             )
          })
          }

      </View>
  )
  }  
    
};
