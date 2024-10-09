import React from "react";
import Home from "./components/Home";
import GoalDetails from "./components/GoalDetails";
import PressableButton from "./components/PressableButton"; 
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

const headerOptions = {
  headerStyle: { backgroundColor: "purple" },
  headerTintColor: "white",
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            ...headerOptions,
            title: "My Goals",
          }}
        />
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={({ route }) => ({
            ...headerOptions,
            title: route.params ? route.params.goalData.text : "More Details",
            headerRight: () => (
              <PressableButton pressedFunction={() => console.log("warning")}>
                <Text style={{ color: 'white', fontSize: 16 }}>Warning</Text>
              </PressableButton>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}