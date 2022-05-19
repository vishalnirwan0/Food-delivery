import React, { Component } from 'react';
import {  InfoWindow, Marker,Map, GoogleApiWrapper, Geocoder } from 'google-maps-react';
import imgdelivery from '../../assets/icons/delivery.png';
import imgshop from '../../assets/icons/shop.png';
import { View, Text,TouchableOpacity } from "react-native";
import db from "../../firebase";
import { collection, getDoc, doc,query,where, getDocs,updateDoc,GeoPoint } from "firebase/firestore";
import { async } from '@firebase/util';
import  firebase  from 'firebase/compat/app';

const mapStyles = {
    width:2000,
    height:600
  };


function getGeocode(address) {
  return new Promise(resolve =>{var geocoder = new google.maps.Geocoder();
    var result;
   console.log("f111");
   console.log(address);
    geocoder.geocode({ address }, function (results) {
          result = results[0].geometry.location;
          //console.log(result);
          resolve(result)
        })
  
});
}

  export class MapContainer extends Component {
    //state = {
      //Caddr: {lat: 50.9348, lng: -1.3959}
    //}
    asyncCall = async()=>{
      console.log('hi',this.state.Readdress)
      let Cresult = await getGeocode(this.state.Caddress);
      let Reresult = await getGeocode(this.state.Readdress);
      let Deresult = await getGeocode(this.state.Deaddress);
      this.setState({
      Culuru :Cresult,
      Reuluru :Reresult,
      Deuluru: Deresult,
      })
      //console.log("CUluru");
      //console.log(Culuru);
      return Cresult;
    }
    getDeaddress = async()=>{
      const docRef = doc(db, "drivers", sessionStorage.getItem('Deliveryid'));
      const docSnap = await getDoc(docRef);
      this.setState({
        Deaddress:docSnap.data().location
      })
    }
    getReaddress = async()=>{
      const docRef = doc(db, "restuarants", sessionStorage.getItem('restaurant'));
      const docSnap = await getDoc(docRef);
      this.setState({
        Readdress: docSnap.data().restaurantPostCode
      })
    }
    updateaddress = async()=>{
      const docRef = doc(db, "drivers", sessionStorage.getItem('Deliveryid'));
      const docRef1 = doc(db, "orders", localStorage.getItem('currentOrder'));
      //var add= this.state.Culuru.toJSON();
      //console.log(add);
      await updateDoc(docRef, {
        location: this.state.Caddress,
        status: true
      });
      await updateDoc(docRef1, {
        status: 'completed'
      });
    }
    constructor(props){
      super(props);
      this.state=({
      Caddress: localStorage.getItem('postcode'),
      Readdress: '',
      Deaddress: '',
      Culuru :{ lat: 50.9348, lng: -1.3959 },
      Reuluru :{ },
      Deuluru : { },
      })
      this.getReaddress();
      this.getDeaddress();
      this.asyncCall();
    }
    componentDidMount(){
      setTimeout(()=>{
        this.updateaddress();
        this.getReaddress();
        this.getDeaddress();
        this.asyncCall();
        console.log(this.state);
      },10000)
    }
    render() {
      //console.log("f222");
      return (
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={this.state.Culuru}
          >
            <Marker position = {this.state.Culuru} />
            <Marker position = {this.state.Reuluru} icon = {imgshop}/>
            <Marker position = {this.state.Deuluru} icon = {imgdelivery}/>
        </Map>
      );
    }
  }
   
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyCVrOn2PR13E_a0gHhRM4LLxOZ5Tq00bqI'
  })(MapContainer);
