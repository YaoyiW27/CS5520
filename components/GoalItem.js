import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function GoalItem({ goal }) {
  return (
    <View style={styles.goalContainer}>
      <Text style={styles.goalText}>{goal.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  goalContainer: {
    flexDirection: "row",
    justifyContent: "flex-start", 
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