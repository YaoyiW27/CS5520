import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function GoalItem({ goal, onDelete }) {
  return (
    <View style={styles.goalContainer}>
      <Text style={styles.goalText}>{goal.text}</Text>
      <Button title="X" color="red" onPress={() => onDelete(goal.id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  goalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#aaa",
    borderRadius: 5,
  },
  goalText: {
    color: "purple",
    fontSize: 18,
  },
});