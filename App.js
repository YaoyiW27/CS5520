import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import Home from "./components/Home";
import GoalDetails from "./components/GoalDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
// console.log(Stack);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "purple" },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: { backgroundColor: "purple" },
            headerTintColor: "white",
            title: "My goals",
          }}
        />
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={({ route }) => ({
            title: route.params ? route.params.goalData.text : "More Details",
            headerRight: () => {
              return (
                <Button
                  title="Warning"
                  onPress={() => {
                    console.log("warning");
                  }}
                />
              );
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});