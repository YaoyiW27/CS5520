import React from 'react'
import { View, Text, Button } from 'react-native'


export default function GoalDetails({ navigation, route }) {
  console.log(route.params.goalData);
  function moreDetailsHandler() {
    navigation.navigate("Details");
  }

  return (
    <View>
      <Text>This is details of a goal with text {route.params.goalData.text}.
        {route.params.goalData.id}
      </Text>
      <Button title="More Details" onPress={() => {
        navigation.navigate("GoalDetails", { goalData: route.params.goalData });
        }} />
    </View>

  )
}