import React, { useState, useEffect, Component } from "react";
import { View, Text, SafeAreaView, Modal, ScrollView, StyleSheet, Image,TouchableOpacity} from "react-native";
import { Divider } from "react-native-elements";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../firebase";
import imgshop from '../../assets/icons/shop.png';
import HistoryOrderDetails from "./HistoryOrderDetails";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";



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


export default class Orders extends Component{
  //const [restaurants,setRes] = useState([]);
  // gotodetails=({navigation})=>{
  //   localStorage.setItem('currentOrder', this.state.id[i].id);
  //   navigation.navigate('HistoryOrderDetails');
  // }
  getOrder= async () => {
    var newres = [];
    var newtime=[];
    var newitems= [];
    var newprice =[];
    var newstatus =[];
    var newid =[];
    querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    //doc.data() is never undefined for query doc snapshots
    //console.log(doc.data());
    newres.push({'res' : doc.data().restaurantName});
    newitems.push({'items': doc.data().items});
    newtime.push({'time': doc.data().createdAt.toDate().toLocaleString()});
    newprice.push({'total': doc.data().total});
    newstatus.push({'status': doc.data().status});
    newid.push({'id': doc.id});
   });
   this.setState({
    restaurantName: newres,
    items : newitems,
    time : newtime,
    total: newprice,
    status: newstatus,
    id: newid,
});
  };
  constructor(){
    super();
    
    this.state = {
      restaurantName: {},
      items : {},
      time : {},
      total: {},
      status: {},
      id: {},
      modalVisible: false,
    };
    this.getOrder();
    //console.log('ok');
    //console.log(this.state);
  };
  componentDidMount(){
    setTimeout(()=>{
      this.getOrder();
      console.log(this.state);
    },1000)
  }

  render(){
    return(
      <View>
        <View >
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
              name={'compress-arrows-alt'}
              size={25}
              style={{
                marginBottom: 3,
              }}
            />
            <Text>close</Text>
            </View>
            </TouchableOpacity>
            </View>
        <ScrollView>
        <HistoryOrderDetails/>
        </ScrollView>
      </Modal>
      </View>
      <View>
          {this.state.restaurantName &&  Object.keys(this.state.restaurantName).map((v,i) => {
             return (
              <View key={i}>
                <TouchableOpacity  onPress={() => {
                  localStorage.setItem('currentOrder', this.state.id[i].id);
                  this.setState({modalVisible:true});
                  }}>
             <View style={{flexDirection:'row' }}>
             <Image source={imgshop} 
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 8,
                    }}/>
             <Text style={styles.titleStyle} >{this.state.restaurantName[i].res}</Text>
             </View>
             <View style={{flexDirection:'row' }}>
             <ScrollView horizontal={true} > 
               {this.state.items[i].items.map((v1,i1) =>{
                 return (
                   <View key = {i1} style={{flexDirection:'row' }}>
                     
                      <Image  source = {{uri: v1.foodImage}}
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
                 <Text style={{ fontWeight: "600", fontSize: 16 }}>{v1.foodName}</Text>
                 <Text style={{ opacity: 0.7, fontSize: 16 }}>{v1.foodPrice}</Text>
                 </View>
                   </View>
                 )
               })}
             </ScrollView>
             <View>
             <Text style={styles.timeStyle}>{this.state.time[i].time}</Text>
             <Text style={styles.timeStyle}>{this.state.total[i].total}</Text>
             <Text style={styles.timeStyle}>Order Status: {this.state.status[i].status}</Text>
             {/* <Text style={styles.timeStyle}>Order Status: {this.state.id[i].id}</Text> */}
             </View>
             </View>
             <Divider width={1} />
             </TouchableOpacity>
             </View>
             )
          })
          }

      </View>
      </View>
  )
  }  
    
};
