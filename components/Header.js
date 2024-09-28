import { StyleSheet, View, Text } from "react-native";
import React from "react";

export default function Header({ name, children }) {
  return (
    <View >
      <Text style={styles.text}>Welcome to {name}!</Text>
      {children}
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
    marginBotton: 10,
  },
});