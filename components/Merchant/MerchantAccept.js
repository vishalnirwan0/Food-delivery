import React, { useState, useEffect, Component } from "react";
import { View, Text, SafeAreaView, Modal, ScrollView, StyleSheet, Image,TouchableOpacity} from "react-native";
import { Divider } from "react-native-elements";
import { collection, query, where, getDocs,updateDoc, deleteDoc, doc ,getDoc} from "firebase/firestore";
import db from "../../firebase";
import DeliveryPerson from "./DeliveryPerson";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";



const q = query(collection(db, "orders"), where("restaurantName", "==", localStorage.getItem("res")));
const styles = StyleSheet.create({
  timeStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },

  titleStyle: {
    fontSize: 20,
    fontWeight: "600",
    justifyContent: "center",
    alignItems: 'center'
  },
  headtext: { textAlign: 'center' ,color: 'white'},
  gbtn: { alignItems: "center" ,width: 70, height: 30, margin: 20, backgroundColor: '#228B22', borderRadius: 20, padding:5 },
  rbtn: { alignItems: "center" ,width: 70, height: 30, margin: 20, backgroundColor: '#B22222', borderRadius: 20, padding:5 },
  bbtn: { alignItems: "center" ,width: 70, height: 30, margin: 20, backgroundColor: '#4169E1', borderRadius: 20, padding:5 },
  statusStyle: { alignItems: "center" ,width: 70, height: 30, margin: 20, borderRadius: 20, padding:5 },
});
var querySnapshot;


export default class MerchantAccpet extends Component{
  
  getOrder= async () => {
    var newres = [];
    var newtime=[];
    var newitems= [];
    var newprice =[];
    var newstatus =[];
    var newid =[];
    var newestime=[];
    var newname = [];
    var newaddress= [];
    var newPostCode= [];
    var newEmail =[];
    var cEmail = [];
    querySnapshot = await getDocs(q);
    querySnapshot.forEach(async(doc1) => {
    //doc.data() is never undefined for query doc snapshots
    //console.log(doc.data());
    var esitime = doc1.data().createdAt.toDate()
    esitime = esitime.setHours(esitime.getHours() +  1)
    esitime = new Date(esitime)
    newres.push({'res' : doc1.data().restaurantName});
    newitems.push({'items': doc1.data().items});
    newtime.push({'time': doc1.data().createdAt.toDate().toLocaleString()});
    newprice.push({'total': doc1.data().total});
    newstatus.push({'status': doc1.data().status});
    newid.push({'id': doc1.id});
    newestime.push({'esitime':esitime.toLocaleString()});
    // get the customer information
    newname.push({"customer_name": doc1.data().customerName});
    newaddress.push({"customer_address": doc1.data().customeraddress});
    newPostCode.push({"customer_postcode": doc1.data().customerpostcode});
    newEmail.push({"customer_email": doc1.data().customeremail});
    if(cEmail.indexOf(doc1.data().customeremail) == -1){
      cEmail.push(doc1.data().customeremail)
    }
    
   });
    localStorage.setItem('historycustomer',JSON.stringify(cEmail));
    this.setState({
      restaurantName: newres,
      items : newitems,
      time : newtime,
      total: newprice,
      status: newstatus,
      esitime:newestime,
      id: newid,
      customername:newname,
      customeraddress:newaddress,
      customerpostcode:newPostCode,
      customeremail: newEmail,
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
      esitime:{},
      customername:{},
      customeraddress:{},
      customerpostcode:{},
      customeremail:{},
      modalVisible: false,
    };
    this.getOrder();
    console.log('ok');
    console.log(this.state);
  };
  componentDidMount(){
    setTimeout(()=>{
      this.getOrder();
      console.log(this.state.customername[0]);
    },1000)
    

  }
  deleteOrder = async(name) =>{
    await deleteDoc(doc(db, "orders", name));
    this.getOrder();
  }
  acceptOrder = async(name) =>{
    const updateRes = doc(db, "orders", name);
    console.log(name);
    await updateDoc(updateRes, {
        status: 'accept'
      });
    this.getOrder();
  }
  assignDelivery = async(name) =>{
    sessionStorage.setItem("orderid", name);
    this.setState({modalVisible:true})
  }
  render(){
    return(
      <View>
        <View style={{backgroundColor: "white",}}>
      <Modal
        animationType="slide"
        visible={this.state.modalVisible}
        transparent={false}
        presentationStyle={'formSheet'}
        onRequestClose={() => this.setState({modalVisible:false})}
      >
        <View style={{backgroundColor: "white",}}>
          <TouchableOpacity  
            onPress={() =>{
            this.setState({modalVisible:false});
            sessionStorage.removeItem("orderid");
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
        <DeliveryPerson/>
      </Modal>
      </View>
      <View>
          {this.state.customername[0]  &&  Object.keys(this.state.restaurantName).map((v,i) => {
             return (
              <View key={i}>
             <View style={{flexDirection:'row' }}>
             <ScrollView horizontal={true} style={{width : 800}} > 
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
                 <Text style={{ fontWeight: "600", fontSize: 16 ,margin: 20}}>{v1.foodName}</Text>
                 <Text style={{ opacity: 0.7, fontSize: 16,margin: 20 }}>{v1.foodPrice}</Text>
                 </View>
                   </View>
                 )
               })}
             </ScrollView>
             <ScrollView horizontal={true} style={{width : 300}} > 
             <View>
             <Text style={styles.timeStyle}>Created at: {this.state.time[i].time}</Text>
             <Text style={styles.timeStyle}>Estimate time : {this.state.esitime[i].esitime}</Text>
             <Text style={styles.timeStyle}>Total: {this.state.total[i].total}</Text>
             {/* <Text style={styles.timeStyle}>Order Status: {this.state.id[i].id}</Text> */}
             </View>
             </ScrollView>
             <ScrollView horizontal={true} style={{width : 400}}>
             <View>
               {/* {this.state.customername[i]?(
                 <> */}
                  
              <Text style={{ fontWeight: "600", fontSize: 16 ,margin: 8}}>Delivery Information:</Text> 
              <Text style={styles.timeStyle}>Customer Name: {this.state.customername[i].customer_name}</Text>
              <Text style={styles.timeStyle}>Customer Email: {this.state.customeremail[i].customer_email}</Text>
             <Text style={styles.timeStyle}>Delivery Address : {this.state.customeraddress[i].customer_address}</Text>
             <Text style={styles.timeStyle}>Postcode: {this.state.customerpostcode[i].customer_postcode}</Text>
             {/* </>):(<></>)} */}
             </View>
             </ScrollView>
             {this.state.status[i].status == 'created'?
             (
                 <View style={{justifyContent: "space-between"}}>
                 <TouchableOpacity onPress={() => this.acceptOrder(this.state.id[i].id)}>
                  <View style={styles.gbtn}>
                    <Text style={styles.headtext}>accept</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => this.deleteOrder(this.state.id[i].id)}>
                <View style={styles.rbtn}>
                  <Text style={styles.headtext}>decline</Text>
                </View>
              </TouchableOpacity>
    
                 </View>
                 ):(
                 <>
                 {this.state.status[i].status== 'accept'?(
                  <View style={{justifyContent: "space-between"}}>
                 <TouchableOpacity onPress={() => this.assignDelivery(this.state.id[i].id)}>
                  <View style={styles.bbtn}>
                    <Text style={styles.headtext}>Delivery</Text>
                  </View>
                </TouchableOpacity>
                </View>
                 ):(
                 <>
                 {this.state.status[i].status== 'delivery'?(
                  <View >
                    <Text style={styles.statusStyle}>Delivery</Text>
                </View>
                 ):(
                 <>
                 <View>
                    <Text style={styles.statusStyle}>Finished</Text>
                </View>
                 </>)}
                 </>)}
                 </>)}
             
             </View>
             <Divider width={1} />
             </View>
             )
          })
          }

      </View>
      </View>
  )
  }  
    
};
