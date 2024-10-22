import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'

export default function GoalUsers() {
    useEffect( () => {
        // fetch data
        async function fetchData() {
            try {
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/users'
            )
        }catch(err)
        {console.log("fetch user data", err);
        }
            fetchData();
        }
        fetchData();
    }, []);
  return (
    <View>
      <Text>GoalUsers</Text>
    </View>
  )
}

const styles = StyleSheet.create({})