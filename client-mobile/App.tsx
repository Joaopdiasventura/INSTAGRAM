import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Enter from "./src/pages/enter";
import { StatusBar } from "react-native";
import Routes from "./src/routes";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar></StatusBar>
      <Routes />
    </>
  );
}