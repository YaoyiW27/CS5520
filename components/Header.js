import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// update the header component to accept a prop
export default function Header({name}) {
  return (
    <View>
      <Text>Welcome to {name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})