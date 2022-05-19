import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as ReduxProvider } from "react-redux";

import configureStore from "./redux/store";
import Home from "./screens/Home";
import RestaurantDetail from "./screens/RestaurantDetail";
import OrderCompleted from "./screens/OrderCompleted";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import Account from "./screens/Account";
import HistoryOrder from "./screens/HistoryOrder";
import Admin from "./screens/Admin";
import MerchantMenu from "./screens/MerchantMenu";
import MerchantHome from "./screens/MerchantHome";
import MerchantOrders from "./screens/MerchantOrders";


const store = configureStore();

export default function RootNavigation() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          
          {localStorage.getItem("userData") ?(
          <>
            {(localStorage.getItem("role")=="Admin")? (<Stack.Screen name="Admin" component={Admin}/>):(
            <>
            {(localStorage.getItem("role")=="customer")? (
              <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} paths="home/detail" />
              <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
              <Stack.Screen name="SignInScreen" component={SignInScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              <Stack.Screen name="Account" component={Account} />
              <Stack.Screen name="HistoryOrder" component={HistoryOrder} />
              </>
              ) : (
              <>
              {(localStorage.getItem("role")=="owner")? (
              <>
              <Stack.Screen name="MerchantHome" component={MerchantHome} />
              <Stack.Screen name="SignInScreen" component={SignInScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              <Stack.Screen name="MerchantMenu" component={MerchantMenu} />
              <Stack.Screen name="MerchantOrders" component={MerchantOrders} />
              </>
              ):(
              <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} paths="home/detail" />
              <Stack.Screen name="SignInScreen" component={SignInScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              </>)}
              </>
              )
              }
            </>
            )}
          </>
          ):(
            <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} paths="home/detail" />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          
          </>
          )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}