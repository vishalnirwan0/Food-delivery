import React,{Component } from "react";
import { View, Text, SafeAreaView, ScrollView,StyleSheet,Modal,TouchableOpacity } from "react-native";
import StepIndicator from 'react-native-step-indicator';
import { collection, getDoc, doc } from "firebase/firestore";
import db from "../../firebase";
import Maps from "./Maps";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const styles = StyleSheet.create({
  bbtn: { alignItems: "center" ,width: 70, height: 30, margin: 20, backgroundColor: 'black', borderRadius: 20, padding:5 },
  headtext: { textAlign: 'center' ,color: 'white'},
});
export default class OrderInfo extends Component{
    getinfo = async()=>{
      const docRef = doc(db, "orders", localStorage.getItem('currentOrder'));
      const docSnap = await getDoc(docRef);
      var esitime = docSnap.data().createdAt.toDate()
      esitime = esitime.setMinutes(esitime.getMinutes() +  5)
      esitime = new Date(esitime)
      this.setState({
        estime: esitime.toLocaleString(),
        orderId:localStorage.getItem('currentOrder'),
        deliveryAddress: localStorage.getItem('address'),
        username: localStorage.getItem('name'),
        email: localStorage.getItem('userData'),
        resName: docSnap.data().restaurantName,
        total: docSnap.data().total,
        Delivery: docSnap.data().deliveryname,
        Deliveryid:docSnap.data().deliveryid,
        status: docSnap.data().status,
        resid: docSnap.data().restaurantid,
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
          Delivery:[],
          Deliveryid:[],
          status:[],
          resid:[],
          modalVisible: false,
      })
      this.getinfo();
    }
    componentDidMount(){
      setTimeout(()=>{
        this.getinfo();
        //console.log(this.state);
      },1000)
    }
    track(){

    }
  
    render(){
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
         
        {/* green checkmark */}
        {this.state.status == 'completed' ? (
        <>
         <View>
          <Text style={{ fontSize: 20, fontWeight: "bold",alignSelf: 'center', }}>
            Your order at {this.state.resName} delivered by {this.state.Delivery}
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
        </>
        ):(
          <>
          {this.state.status=='delivery' ? 
          (
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
          <Text style={{ fontSize: 20, fontWeight: "bold",alignSelf: 'center', }}>
          Your order is being dispatched by {this.state.Delivery}. Click here to track
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold",alignSelf: 'center', }}>
           Click here to track
          </Text>
          <View style={{ flexDirection: 'row',justifyContent: "center"}}>
            <TouchableOpacity 
            onPress={() =>{
            this.setState({modalVisible:true});
            sessionStorage.setItem('Deliveryid',this.state.Deliveryid);
            sessionStorage.setItem('restaurant',this.state.resid);
            }}>
              <View style={styles.bbtn}>
                <Text style={styles.headtext}>track</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        ):(
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
        </View>)}
          
        </>
        )}
         <View >
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
        <ScrollView >
        <Maps/>
        </ScrollView>
      </Modal>
      </View>        
      </SafeAreaView>
      );
      }
  
  }