import db from "../firebase";
import React,{useState,useEffect} from 'react';
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import MerchantBottomTabs from "../components/home/MerchantBottomTabs";
import MerchantAccept from "../components/Merchant/MerchantAccept";

export default function MerchantOrders({ navigation }) {
    return(
        <View>
            <MerchantBottomTabs navigation={navigation}/>
            <Divider width={1} />
            <MerchantAccept/>
        </View>
    )
}