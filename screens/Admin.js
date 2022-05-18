import React, {Component} from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet,TouchableOpacity} from "react-native";
import {Row, Table, Cell, TableWrapper} from 'react-native-table-component';
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import db from "../firebase";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { async } from "@firebase/util";

var querySnapshot;
const optionsChange = {
    tableHead: ['Restaurent Name', 'Phone', 'Email', 'Restaurant Address', 'Postcode', 'Opterator'],
}

export default class Admin extends Component{
    getRestaurants = async()=>{
        var newRes = [];
        var newPhone=[];
        var newEmail= [];
        var newAddress =[];
        var newPostcode=[];
        var newStatus=[];
        var newId=[];
        querySnapshot = await getDocs(collection(db, "restuarants"));
        querySnapshot.forEach((doc) => {
            newRes.push(doc.data().restaurantName);
            newPhone.push(doc.data().restaurantPhone);
            newEmail.push(doc.data().restaurantEmail);
            newAddress.push(doc.data().restaurantAddress);
            newPostcode.push(doc.data().restaurantPostCode);
            newStatus.push(doc.data().admin_authorization);
            newId.push(doc.id);
            //newOwner.push({})
        })

        this.setState({
            restaurantName: newRes,
            Phone : newPhone,
            Email : newEmail,
            Address: newAddress,
            Postcode : newPostcode,
            Status : newStatus,
            Id : newId,
        })
        
        const rowData = [];
        {this.state.restaurantName &&  this.state.restaurantName.map((v,i) => {
            const newData =[];
            //key=i;
            newData.push(v);
            newData.push(this.state.Phone[i]);
            newData.push(this.state.Email[i]);
            newData.push(this.state.Address[i]);
            newData.push(this.state.Postcode[i]);
            //console.log(rowData);
            rowData.push(newData)
           })}

        this.setState({
            restaurantName: newRes,
            Phone : newPhone,
            Email : newEmail,
            Address: newAddress,
            Postcode : newPostcode,
            Status : newStatus,
            Id : newId,
            Data: rowData,
        })
        //console.log(this.state);   
    }

    constructor(){
        super(); 
       
        this.state = ({
            restaurantName: [],Phone : [], Email : [],Address: [],Postcode : [],Status :[],Id :[],Data: [],
        })
        this.getRestaurants();
    }

    updateStatus = async(name)=>{
        const updateRes = doc(db, "restuarants", name);
        console.log(name);
        await updateDoc(updateRes, {
            admin_authorization: true
          });
        this.getRestaurants();
    }

    deleteRes = async(name) =>{
        await deleteDoc(doc(db, "restuarants", name));
        this.getRestaurants();
    }
    componentDidMount(){
        setTimeout(()=>{
          this.getRestaurants();
          //console.log(this.state);
        },1000)
      }

    render(){
        const FButton = (name) => (
            <View style={{ flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.updateStatus(name)}>
              <View style={styles.gbtn}>
                <Text style={styles.headtext}>approve</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => this.deleteRes(name)}>
            <View style={styles.rbtn}>
              <Text style={styles.headtext}>reject</Text>
            </View>
          </TouchableOpacity>
          </View>
          );
          const TButton =(name) =>(
            <View style={{ flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.deleteRes(name)}>
            <View style={styles.rbtn}>
              <Text style={styles.headtext}>Delete</Text>
            </View>
          </TouchableOpacity>
          </View>
          );
        return(
            <View>
                {/* <View style={{ flexDirection: 'row',alignSelf: 'center'}}> */}
                <View style={{alignSelf:'flex-end'}}>
                <TouchableOpacity  
                    onPress={() =>{
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.reload();
                 }} >
                <View>
                    <FontAwesome5
                    name={'sign-out-alt'}
                    size={25}
                    style={{
                    marginBottom: 3,
                     }}
                    />
                <Text>log out</Text>
                </View>
                </TouchableOpacity>
                </View>
                <Text style = {{
                    fontSize: 40,
                    fontWeight: "600",
                    alignSelf: 'center',
                    }}>Restaurant Management
                </Text>
    
                {/* </View> */}
            <ScrollView>
                <Table borderStyle={{ borderWidth: 1, borderColor: 'Black' }} >
                <Row style={styles.head} data={optionsChange.tableHead} textStyle={styles.headtext} />
                {this.state.Data.map((rowd,i)=>(
                    <TableWrapper key={i} style={styles.row} >
                        {/* <Cell data = {
                            <BouncyCheckbox
                            iconStyle={{ borderColor: "black", borderRadius: 0 }}
                            fillColor="green"
                            //isChecked={isFoodInCart(food, cartItems)}
                            //onPress={(checkboxValue) => selectItem(food, checkboxValue)}
                            />} 
                        /> */}
                    {rowd.map((cellData, cellIndex) => (
                        <Cell  key={cellIndex} data={cellData} textStyle={styles.text}/>
                      ))
                    }
                    {this.state.Status[i]? (<Cell data={TButton(this.state.Id[i])} Style={styles.text}/>):(<Cell data={FButton(this.state.Id[i])} Style={styles.text}/>)}
                  </TableWrapper>
                ))}
                </Table>
            </ScrollView>
           
            </View>
        )
    }
}


const styles = StyleSheet.create({
    head: {  height: 40,  backgroundColor: 'black'  },
    row: {  flexDirection: 'row', height: 40, },
    headtext: { textAlign: 'center' ,color: 'white'},
    text: { textAlign: 'center' ,color: 'black'},
    gbtn: { alignItems: "center" ,width: 60, height: 30, marginLeft: 10, backgroundColor: '#228B22', borderRadius: 20,padding: 5 },
    rbtn: { alignItems: "center" ,width: 60, height: 30, marginLeft: 10, backgroundColor: '#B22222', borderRadius: 20,padding: 5 },
  });
 