import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";

//status time deliveryperson address map name phone

export default function Orderstatus() {

  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );

  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });
return(
    <View
    style={{
      margin: 15,
      alignItems: "center",
      height: "100%",
    }}
  >
    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
      Your order at {restaurantName} has been placed for {totalUSD}
    </Text>
    
  </View>
)
}