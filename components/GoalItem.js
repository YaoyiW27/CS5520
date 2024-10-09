import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function GoalItem({ goalObj, deleteHandler, navigation, onHighlight, onUnhighlight }) {
  function handleDelete() {
    console.log("Deleted goal with ID:", goalObj.id);
    deleteHandler(goalObj.id);
  }

  function handleLongPress() {
    Alert.alert(
      "Delete Goal", 
      "Are you sure you want to delete this goal?",
      [
        {
          text: "Yes",
          onPress: handleDelete,
          style: "destructive"
        },
        {
          text: "No",
          style: "cancel"
        }
      ]
    );
  }

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.textContainer,
        pressed && styles.pressedStyle,
      ]}
      onPress={() => {
        navigation.navigate("Details", { goalData: goalObj });
        onHighlight(); 
      }}
      onPressOut={() => {
        onUnhighlight(); 
      }}
      onLongPress={handleLongPress}
      android_ripple={{ color: "purple", borderless: true }}
    >
      <Text style={styles.text}>{goalObj.text}</Text>
      <MaterialIcons 
        name="delete-outline" 
        size={24} 
        color="black" 
        onPress={handleLongPress} 
      />
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
  pressedStyle: {
    backgroundColor: "blue",
  },
});