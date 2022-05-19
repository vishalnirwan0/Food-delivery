import React, { useState, useEffect, Component } from "react";
import { View, Text, SafeAreaView, Modal, ScrollView, StyleSheet, Image,TouchableOpacity} from "react-native";
import { Divider } from "react-native-elements";
import { collection, query, where, getDocs,updateDoc, deleteDoc, doc ,getDoc} from "firebase/firestore";
import db from "../../firebase";
import {Row, Table, Cell, TableWrapper} from 'react-native-table-component';


var querySnapshot;
const optionsChange = {
    tableHead: ['ID','Driver Name', 'latitude', 'longitude','status'],
}

export default class DeliveryPerson extends Component{
    getDeliveryPerson = async()=>{
        var newname = [];
        var newlalocation=[];
        var newlolocation=[];
        var newstatus= [];
        var newid=[];
        querySnapshot = await getDocs(collection(db, "drivers"));
        querySnapshot.forEach((doc) => {
            newname.push(doc.data().Name);
            newlalocation.push(doc.data().location._lat);
            newlolocation.push(doc.data().location._long)
            newstatus.push(doc.data().status);
            newid.push(doc.id);
            //newOwner.push({})
        })

        this.setState({
            deliveryName: newname,
            laposition : newlalocation,
            loposition: newlolocation,
            Status : newstatus,
            Id : newid,
        })
        
        const rowData = [];
        {this.state.deliveryName &&  this.state.deliveryName.map((v,i) => {
            const newData =[];
            //key=i;
            newData.push(this.state.Id[i]);
            newData.push(v);
            newData.push(this.state.laposition[i]);
            newData.push(this.state.loposition[i]);
            rowData.push(newData)
           })}
           console.log('hi')
           console.log(rowData)

           this.setState({
            deliveryName: newname,
            laposition : newlalocation,
            loposition: newlolocation,
            Status : newstatus,
            Id : newid,
            Data: rowData,
        })
        
        //console.log(this.state);   
    }

    constructor(){
        super(); 
       
        this.state = ({
            deliveryName: [],
            laposition : [],
            loposition:[],
            Status : [],
            Id : [],
            Data:[],
        })
        this.getDeliveryPerson();
    }

    updateStatus = async(name,id)=>{
        const updateRes = doc(db, "drivers", id);
        console.log(name);
        await updateDoc(updateRes, {
            status: false
          });
        const updateRes1 =doc(db,"orders",sessionStorage.getItem("orderid"));
        await updateDoc(updateRes1, {
            deliveryname: name,
            deliveryid: id,
            restaurantid: localStorage.getItem('id'),
            status: 'delivery',
          });
        this.getDeliveryPerson();
    }
    componentDidMount(){
        setTimeout(()=>{
          this.getDeliveryPerson();
          console.log(this.state);
        },1000)
      }

    render(){
        const FButton = (name,id) => (
            <View style={{ flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.updateStatus(name,id)}>
              <View style={styles.bbtn}>
                <Text style={styles.headtext}>assign</Text>
              </View>
            </TouchableOpacity>
          </View>
          );
        return(
            <View>
                {/* <View style={{ flexDirection: 'row',alignSelf: 'center'}}> */}
                <Text style = {{
                    fontSize: 40,
                    fontWeight: "600",
                    alignSelf: 'center',
                    }}>Delivery Person assignment
                </Text>
    
                {/* </View> */}
            <ScrollView>
                <Table borderStyle={{ borderWidth: 1, borderColor: 'Black' }} >
                <Row style={styles.head} data={optionsChange.tableHead} textStyle={styles.headtext} />
                {this.state.Data.map((rowd,i)=>(
                    <TableWrapper key={i} style={styles.row} >
                    {rowd.map((cellData, cellIndex) => (
                        <Cell  key={cellIndex} data={cellData} textStyle={styles.text}/>
                      ))
                    }
                    {this.state.Status[i]? (<Cell data={FButton(this.state.deliveryName[i],this.state.Id[i])} Style={styles.text}/>):(<Cell data='busy' Style={styles.statusStyle}/>)}
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
    bbtn: { alignItems: "center" ,width: 70, height: 30, margin: 20, backgroundColor: '#4169E1', borderRadius: 20, padding:5 },
    statusStyle: { alignItems: "center" ,width: 70, height: 30, margin: 20, borderRadius: 20, padding:5 },
  });
 