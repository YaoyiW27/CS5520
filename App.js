import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import Home from "./components/Home";
import GoalDetails from "./components/GoalDetails";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

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
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: "purple" },
            headerTintColor: "white",
            title: "My goals",
            headerRight: () => (
              <Ionicons
                name="person-circle-outline"
                size={30}
                color="white"
                onPress={() => navigation.navigate('Profile')}
                style={{ marginRight: 10 }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={({ route }) => ({
            title: route.params ? route.params.goalData.text : "More Details",
            headerRight: () => (
              <Button
                title="Warning"
                onPress={() => {
                  console.log("warning");
                }}
              />
            ),
          })}
        />
        <Stack.Screen name="Signup" component={Signup} options={{ title: "Sign up" }} />
        <Stack.Screen name="Login" component={Login} options={{ title: "Login" }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});