import React from 'react'
import { Text, View } from 'react-native'
import Home from './components/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoalDetails from './components/GoalDetails';

const Stack = createNativeStackNavigator();
console.log(Stack);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Homepage" component={Home} />
        <Stack.Screen name="GoalDetails" component={GoalDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}