import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Header({ name }) {
  return (
    <View>
      <Text style={styles.text}>Welcome to {name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "darkmagenta",
    fontSize: 25,
    borderColor: "darkmagenta",
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
  },
});