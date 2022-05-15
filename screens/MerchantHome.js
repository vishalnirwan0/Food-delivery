
import db from "../firebase";
import React,{useState,useEffect} from 'react';
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { collection, query, limit, onSnapshot, orderBy } from "firebase/firestore"
import MenuItems from "../components/restaurantDetail/MenuItems";
import ViewCart from "../components/restaurantDetail/ViewCart";
import MerchantBottomTabs from "../components/home/MerchantBottomTabs";
import ItemsDetails from "../components/Merchant/ItemsDetails";

const foods = [
  {
    title: "Lasagna",
    description: "With butter lettuce, tomato and sauce bechamel",
    price: "$13.50",
    image:
      "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
  },
  {
    title: "Tandoori Chicken",
    description:
      "Amazing Indian dish with tenderloin chicken off the sizzles 🔥",
    price: "$19.20",
    image: "https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg",
  },
  {
    title: "Chilaquiles",
    description:
      "Chilaquiles with cheese and sauce. A delicious mexican dish 🇲🇽",
    price: "$14.50",
    image:
      "https://i2.wp.com/chilipeppermadness.com/wp-content/uploads/2020/11/Chilaquales-Recipe-Chilaquiles-Rojos-1.jpg",
  },
  {
    title: "Chicken Caesar Salad",
    description:
      "One can never go wrong with a chicken caesar salad. Healthy option with greens and proteins!",
    price: "$21.50",
    image:
      "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da",
  },
  {
    title: "Lasagna",
    description: "With butter lettuce, tomato and sauce bechamel",
    price: "$13.50",
    image:
      "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
  },
];

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
          orderBy("restaurantName"),
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
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {data.restaurantName} 
        </Text>
        <ItemsDetails/>
        </View>
    );
}
export default MerchantHome;