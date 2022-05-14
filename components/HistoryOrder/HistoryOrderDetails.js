import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import { Divider } from "react-native-elements";
import { doc, getDoc } from "firebase/firestore"
import db from "../../firebase";
import MenuItems from "../restaurantDetail/MenuItems";
import Maps from "../FinishOrder/Maps"
import BottomTabs from "../home/BottomTabs";
import OrderStatus from "../FinishOrder/Orderstatus";

export default function HistoryOrderDetails({navigation}) {
  const [lastOrder, setLastOrder] = useState([]);
  const [restaurantName, setname] = useState([]);
  const [USD,setUSD] = useState([]);
  const docRef = doc(db, "orders", localStorage.getItem('currentOrder'));
  useEffect(async() => {
    const docSnap = await getDoc(docRef);
    setLastOrder(docSnap.data().items);
    setname(docSnap.data().restaurantName);
    setUSD(docSnap.data().total);
  }, []); 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      
      {/* green checkmark */}
      <View>
        <Divider width={1} />
        <View><OrderStatus/></View>
        
        <ScrollView>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Your order at {restaurantName} has been placed for {USD}
        </Text>
          <MenuItems
            foods={lastOrder}
            hideCheckbox={true}
            marginLeft={10}
          />
          <LottieView
            style={{ height: 200, alignSelf: "center" }}
            source={require("../../assets/animations/cooking.json")}
            // autoPlay
            speed={0.5}
          />
        </ScrollView>
        {/* <Maps/> */}
      </View>
      
    </SafeAreaView>
  );
}   