import React, { Component } from 'react';
import {  InfoWindow, Marker,Map, GoogleApiWrapper, Geocoder } from 'google-maps-react';
import imgdelivery from '../../assets/icons/delivery.png';
import imgshop from '../../assets/icons/shop.png';
import db from "../../firebase";

const mapStyles = {
    width: '100%',
    height: '100%'
  };

const address = {Caddress: "SO17 2BD", Readdress: 'SO163AY', Deaddress: 'SO152LB'};

function getCGeocode() {
  return new Promise(resolve =>{var geocoder = new google.maps.Geocoder();
    var result;
    //console.log("f111");
    geocoder.geocode({ address: address.Caddress }, function (results) {
          result = results[0].geometry.location;
          //console.log(result);
          resolve(result)
        })
  
});
}
function getReGeocode() {
  return new Promise(resolve =>{var geocoder = new google.maps.Geocoder();
    var result;
    //console.log("f111");
    geocoder.geocode({ address: address.Readdress }, function (results) {
          result = results[0].geometry.location;
          //console.log(result);
          resolve(result)
        })
  
});
}
function getDeGeocode() {
  return new Promise(resolve =>{var geocoder = new google.maps.Geocoder();
    var result;
    //console.log("f111");
    geocoder.geocode({ address: address.Deaddress }, function (results) {
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
      let Cresult = await getCGeocode();
      let Deresult = await getDeGeocode();
      let Reresult = await getReGeocode();
      this.setState({
      Culuru :Cresult,
      Reuluru :Reresult,
      Deuluru : Deresult,
      })
      //console.log("CUluru");
      //console.log(Culuru);
      return Cresult;
    }
    constructor(props){
      super(props);
      this.state=({
      Culuru :{ lat: 50.9348, lng: -1.3959 },
      Reuluru :{ },
      Deuluru : {  },
      })
      this.asyncCall();
    }
    componentDidMount(){
      setTimeout(()=>{
        this.asyncCall();
        //console.log(this.state);
      },1000)
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
