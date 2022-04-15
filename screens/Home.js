import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import BottomTabs from "../components/home/BottomTabs";
import Categories from "../components/home/Categories";
import HeaderTabs from "../components/home/HeaderTabs";
import RestaurantItems, { localRestaurants } from "../components/home/RestaurantItems";
import SearchBar from "../components/home/SearchBar";


const YELP_API_KEY =
  "LGDfeIKa3KHNxm5oNFOO9Qg_cRWRHG2KC6dPWDBG_siK1qYj6srJQKTucIZ5I0YmZK6Cn-iKhuoC01l2zUG_fDdlXmUC5xZdpCSoWzxtop5mmwLwR4xCB2DTqotVYnYx";


export default function Home({ navigation }) {
    const [restaurantData, setRestaurantData] = useState(localRestaurants);
    const [city, setCity] = useState("southampton");
    // const [activeTab, setActiveTab] = useState("Delivery");


    const getRestaurantsFromYelp = () => {
        const yelpUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}&limit=4`;
    
        const apiOptions = {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
          },
        };
    
        return fetch(yelpUrl, apiOptions)
          .then((res) => res.json())
          .then((json) =>
            setRestaurantData(json.businesses
            )
          );
      };

      useEffect(() => {
        getRestaurantsFromYelp();
      }, [city]);


    return(
        <SafeAreaView style={{ backgroundColor: '#eee', flex: 1 }} >
        <View style={{ backgroundColor: 'white', padding: 15 }} >
        <BottomTabs />
        <Divider width={1} />
            <HeaderTabs />
            <SearchBar cityHandler={setCity} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems
        restaurantData={restaurantData}
        navigation={navigation}
        />
        </ScrollView>
        </SafeAreaView>
    )
}