import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from '../screens/Home';
import DetailsScreen from '../screens/Search';

const Drawer = createDrawerNavigator();


export default function Menu() {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Search" component={DetailsScreen} />
      </Drawer.Navigator>
  );
}