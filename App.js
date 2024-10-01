import React from 'react'
import { Text, View } from 'react-native'
import Home from './components/Home'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  )
}