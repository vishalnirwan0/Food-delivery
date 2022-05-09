import React, { useState, useEffect, Component } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image,} from "react-native";
import { Divider } from "react-native-elements";
import BottomTabs from "../components/home/BottomTabs";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../firebase";
import Orders from "../components/HistoryOrder/Orders"

export default function HistoryOrder({ navigation }) {
    return(
        <View>
            <BottomTabs navigation={navigation}/>
            <Divider width={1} />
            <Text style = {{
                fontSize: 30,
                fontWeight: "600",
                alignSelf: 'center'
            }}>Your History Orders</Text>
            <ScrollView>
            <Orders/>
            </ScrollView>
        </View>
    )
}