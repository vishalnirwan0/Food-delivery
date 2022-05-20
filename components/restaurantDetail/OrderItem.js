import React from "react";
import { View, Text } from "react-native";

export default function OrderItem({ item }) {
  const { foodName, foodPrice } = item;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#999",
      }}
    >
      <Text style={{ fontWeight: "600", fontSize: 16 }}>{foodName}</Text>
      <Text style={{ opacity: 0.7, fontSize: 16 }}>{foodPrice}</Text>
    </View>
  );
}