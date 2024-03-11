import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Enter from "../pages/enter";
import Start from "../pages/start";
import ProfileUser from "../pages/perfilUser";
import Search from "../pages/search";
import ProfileAnother from "../pages/perfilAnother";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ProfileUser" component={ProfileUser} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="ProfileAnother" component={ProfileAnother} />
        <Stack.Screen name="Enter" component={Enter} />
        <Stack.Screen name="Start" component={Start} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}