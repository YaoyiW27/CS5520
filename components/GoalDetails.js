import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState, useLayoutEffect } from "react";

export default function GoalDetails({ navigation, route }) {
  const [isWarning, setIsWarning] = useState(false);

  console.log(route);
  function moreDetailsHandler() {
    navigation.push("Details");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isWarning ? "Warning!" : route.params ? route.params.goalData.text : "More Details",
      headerRight: () => (
        <Button
          title="Warning"
          onPress={() => setIsWarning(true)}
        />
      ),
    })
  }, [navigation, isWarning, route.params]);

  return (
    <View>
      {route.params ? (
        <Text style={[styles.text, isWarning && styles.warningText]}>
          This is details of a goal with text {route.params.goalData.text} and
          id {route.params.goalData.id}
        </Text>
      ) : (
        <Text style={[styles.text, isWarning && styles.warningText]}>More details</Text>
      )}
      <Button title="More Details" onPress={moreDetailsHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: "black",
  },
  warningText: {
    color: "red",
  },
});