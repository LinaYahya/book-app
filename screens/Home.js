import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const Main = () => <View></View>

export default function Home({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerLeft: () => (
            <Text onPress={() => navigation.openDrawer()}>Open</Text>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
