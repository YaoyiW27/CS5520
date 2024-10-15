import { StyleSheet, Text, View, Button, Pressable, Alert } from "react-native";
import React from "react";
import PressableButton from "./PressableButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";


export default function GoalItem({ goalObj, deleteHandler, onPressIn, onPressOut }) {
  const navigation = useNavigation();
  function handleDelete() {
    // console.log("deleted");
    deleteHandler(goalObj.id);
  }

  function handlePress() {
    // pressHandler(goalObj);
    navigation.navigate("Details", { goalData: goalObj });
  }

  function handleLongPress() {
    Alert.alert("Delete", "Are you sure you want to delete this item?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: handleDelete,
      }
    ]);
  }

  return (
    <View style={styles.textContainer}>
      <Pressable
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={({ pressed }) => {
          return [styles.horizontalContainer, pressed && styles.pressedStyle];
        }}
        android_ripple={{ color: "red", radius: 20 }}
      >
        <Text style={styles.text} key={goalObj.id}>
          {goalObj.text}
        </Text>
        {/* <Button title="X" color="gray" onPress={handleDelete} /> */}
        {/* <Button title="i" onPress={()=>{navigation.navigate("Details", { goalData: goalObj })}} /> */}
        <PressableButton
          componentStyle={styles.deleteButton}
          onPress={handleDelete}
          pressedStyle={styles.pressedStyle}
        >
          {/* <Text style={styles.deleteText}>X</Text> */}
          <AntDesign name="delete" size={24} color="black" />
        </PressableButton>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "darkgray",
    padding: 5,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    color: "purple",
    fontSize: 20,
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "darkgray",
  },
  pressedStyle: {
    opacity: 0.5,
    backgroundColor: "darkgray",
  },
  deleteButton: {
    backgroundColor: "darkgray",
  },
  deleteText: {
    color: "white",
  },
  pressedStyle: {
    opacity: 0.5,
    backgroundColor: "blue",
  },
});