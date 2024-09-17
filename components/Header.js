import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Header({name}) {
  return (
    <View>
      <Text>Welcome to {name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', 
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', 
    borderWidth: 2,
    borderColor: '#333',
  }
})