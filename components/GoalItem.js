import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function GoalItem({ goalObj, deleteHandler, pressHandler }) {  
  function handleDelete() {
    console.log("deleted");
    deleteHandler(goalObj.id);
  }

  function handlePress() {
    // pass goal object back to home.js
    pressHandler(goalObj);
  } 

  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{goalObj.text}</Text>
      <Button title="X" color="grey" onPress={handleDelete} />
      <Button title="i" color="grey" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "purple",
    padding: 5,
    fontSize: 30,
  },
  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});