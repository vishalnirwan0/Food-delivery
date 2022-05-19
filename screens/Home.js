import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import db from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import BottomTabs from "../components/home/BottomTabs";
import Categories from "../components/home/Categories";
import HeaderTabs from "../components/home/HeaderTabs";
import RestaurantItems, { localRestaurants } from "../components/home/RestaurantItems";
import SearchBar from "../components/home/SearchBar";
import LoginHeader from "../components/home/LoginHeader";
// import Maps from "../components/FinishOrder/Maps";


const YELP_API_KEY =
  "LGDfeIKa3KHNxm5oNFOO9Qg_cRWRHG2KC6dPWDBG_siK1qYj6srJQKTucIZ5I0YmZK6Cn-iKhuoC01l2zUG_fDdlXmUC5xZdpCSoWzxtop5mmwLwR4xCB2DTqotVYnYx";

//const [userstutes, setuser] = useState(false);
export default function Home({ navigation }) {

      const [restaurantList, setRestaurantList] = useState([]);
    // const [restaurantData, setRestaurantData] = useState(localRestaurants);
    const [city, setCity] = useState("southampton");



    // const getRestaurantsFromYelp = () => {
    //     const yelpUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}&limit=4`;
    
    //     const apiOptions = {
    //       headers: {
    //         Authorization: `Bearer ${YELP_API_KEY}`,
    //       },
    //     };
    
    //     return fetch(yelpUrl, apiOptions)
    //       .then((res) => res.json())
    //       .then((json) =>
    //         setRestaurantData(json.businesses
    //         )
    //       );
    //   };
    const getRestaurantList = async () => {
      const colRef = collection(db, "restuarants");
      // const result = query(colRef);
      // const querySnapshot = await getDocs(result);
      // console.log(">>>>>>>>> querySnapshot", querySnapshot);
      //   querySnapshot.forEach((doc) => {
      //     setRestaurantList((prev) => ([...prev, doc.data()]))
      //   })
      if(localStorage.getItem('userData')){
        var postcode = localStorage.getItem("postcode");
        postcode=postcode.slice(0,4);
        // console.log(postcode)
          const q = query(collection(db, "restuarants"), where("admin_authorization", "==", true));
        getDocs(q)
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              // console.log(doc.data())
              if(postcode == doc.data().restaurantPostCode.slice(0,4)){
                setRestaurantList((prev) => ([...prev, doc.data()]))
              }
              
            });
          })
      }else{
        const q = query(collection(db, "restuarants"), where("admin_authorization", "==", true));
        getDocs(q)
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              console.log(doc.data())
              setRestaurantList((prev) => ([...prev, doc.data()]))
            });
          })
      }
      
    }

      useEffect(() => {
        getRestaurantList();
      }, []);


    return(
      <><>
        {console.log(">>>>>>> restaurant list", restaurantList)}
      </><SafeAreaView style={{ backgroundColor: '#eee', flex: 1 }}>
          <View style={{ backgroundColor: 'white', padding: 15 }}>
            <BottomTabs navigation={navigation} />
            <Divider width={1} />
            {localStorage.getItem("userData") ? (<LoginHeader navigation={navigation} />) : (<HeaderTabs navigation={navigation} />)}

            {/* <SearchBar cityHandler={setCity} /> */}
          </View>
          <Categories />
          <ScrollView showsVerticalScrollIndicator={false} horizontal={true} style={{ alignSelf: 'center' }}>
            <RestaurantItems
              restaurantData={restaurantList}
              navigation={navigation} />
          </ScrollView>
          {/* <Maps/> */}
        </SafeAreaView></>
    )
}