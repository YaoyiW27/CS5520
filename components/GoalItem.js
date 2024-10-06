import { Button, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

export default function GoalItem({ goalObj, deleteHandler, navigation }) {
  function handleDelete() {
    console.log("deleted");
    deleteHandler(goalObj.id);
  }

  return (
    <Pressable style={styles.textContainer} onPress={() => navigation.navigate("Details", { goalData: goalObj }) }>
      <Text style={styles.text}>{goalObj.text}</Text>
      <Button title="X" color="grey" onPress={handleDelete} />
    </Pressable>
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
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});