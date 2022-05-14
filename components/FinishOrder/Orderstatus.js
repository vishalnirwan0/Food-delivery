import React,{Component } from "react";
import { View, Text, SafeAreaView, ScrollView,StyleSheet, } from "react-native";
import StepIndicator from 'react-native-step-indicator';
import { collection, getDoc, doc } from "firebase/firestore";
import db from "../../firebase";
import { async } from "@firebase/util";
//status : create, accept, delivery, finished



//const PAGES = ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'];

const IndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: '#4aae4f',
  separatorUnFinishedColor: '#a4d4a5',
  stepIndicatorFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#a4d4a5',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 12,
  currentStepLabelColor: '#4aae4f',
};

export default class OrderSratus extends Component{
  getStatus = async()=>{
    const docRef = doc(db, "orders", localStorage.getItem('currentOrder'));
    const docSnap = await getDoc(docRef);
    if(docSnap.data().status == 'created') {
      this.setState({position: 0});
    }else if (docSnap.data().status =='accept'){
      this.setState({position: 1});
    }else if (docSnap.data().status =='delivery'){
      this.setState({position: 2});
    }else if(docSnap.data().status == 'completed'){
      this.setState({position: 3});
    }
  }
  constructor(){
    super(); 
    this.state = ({
        position: [],
    })
    this.getStatus();
  }
  componentDidMount(){
    setTimeout(()=>{
      this.getStatus();
      //console.log(this.state);
    },1000)
  }

  render(){
    return (
      <View style={styles.container}>
        
        <View style={styles.stepIndicator}>
          <StepIndicator
            stepCount={4}
            customStyles={IndicatorStyles}
            currentPosition={this.state.position}
            //onPress={onStepPress}
            labels={['Order Created', 'Order accept', 'Delivery', 'Finished']}
          />
        </View>
      </View>
    );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  stepIndicator: {
    marginVertical: 50,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#999999',
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f',
  },
});