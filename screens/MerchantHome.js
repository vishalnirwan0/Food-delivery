
import db from "../firebase";
import React,{useState,useEffect} from 'react';
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { collection, query, limit, onSnapshot, orderBy } from "firebase/firestore"
import MerchantBottomTabs from "../components/home/MerchantBottomTabs";
import ItemsDetails from "../components/Merchant/ItemsDetails";
import ViewCart from "../components/restaurantDetail/ViewCart";

function MerchantHome({ route, navigation }){

    const [data, setData] = useState({
        restaurantName: '',
        restaurantEmail: '',
        restaurantAddress: '',
        restaurantPostCode: '',
        restaurantPhone: '',
        menuItems: [
            {
                key: '',
                foodName: '',
                foodPrice: '',
                foodDescription: '',
                foodImage: '',
            },
          ],
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

  useEffect(() => {
    const fetchdata = onSnapshot(
        query(
          collection(db, "restuarants"),
         // where("restaurantName", "==", "PizzaHutt"),
          // limit(1)
          ),
          (snapshot) => {
            snapshot.docs.map((doc) => setData(doc.data()));
          })
                
return () => fetchdata();

  }, []);

  

    return(
        <View>
      <MerchantBottomTabs navigation={navigation}/>
        <ItemsDetails/>
        <ViewCart navigation={navigation} />
        </View>
    );
}
export default MerchantHome;