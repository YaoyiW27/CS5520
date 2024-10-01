import React from 'react'
import { Text, View } from 'react-native'
import Home from './components/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
console.log(Stack);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Homepage" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}