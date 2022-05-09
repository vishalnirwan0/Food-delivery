import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import BottomTabs from "../components/home/BottomTabs";


export default function Account({ navigation }) {
    return(
        <View>
            <BottomTabs navigation={navigation}/>
            <Divider width={1} />
            <Text
             style={{
             fontSize: 25,
             fontWeight: "300",
             marginTop: 10,
             marginHorizontal: 15,
             alignSelf: 'center',
            }}
             >
             Your Account Details
            </Text>
            <Text
             style={{
             fontSize: 25,
             fontWeight: "300",
             marginTop: 10,
             marginHorizontal: 15,
             alignSelf: 'center',
            }}
             >
             Name: {localStorage.getItem("name") }
            </Text>
            <Text
             style={{
             fontSize: 25,
             fontWeight: "300",
             marginTop: 10,
             marginHorizontal: 15,
             alignSelf: 'center',
            }}
             >
             Email:{localStorage.getItem("userData") }
            </Text>
            <Text
             style={{
             fontSize: 25,
             fontWeight: "300",
             marginTop: 10,
             marginHorizontal: 15,
             alignSelf: 'center',
            }}
             >
             Address:{localStorage.getItem("address") }
            </Text>
            <Text
             style={{
             fontSize: 25,
             fontWeight: "300",
             marginTop: 10,
             marginHorizontal: 15,
             alignSelf: 'center',
            }}
             >
             Postcode:{localStorage.getItem("postcode") }
            </Text>
        </View>
    );
}