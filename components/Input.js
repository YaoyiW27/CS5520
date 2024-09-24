import { Button, Modal, StyleSheet, Text, TextInput, View, Alert, Image } from "react-native";
import React, { useState } from "react";

export default function Input({
  textInputFocus,
  inputHandler,
  isModalVisible,
  dismissModal,
}) {
  const [text, setText] = useState(""); // Manage the input text state
  const [blur, setBlur] = useState(false); // Track if the input has lost focus
  const minimumChar = 3; // Define the minimum character requirement for confirmation

  // Handle the Confirm button press
  function handleConfirm() {
    inputHandler(text); // Pass the text back to the parent component (App.js)
    setText(""); // Clear the input after confirming
  }

  // Handle the Cancel button press
  function handleCancel() {
    // Show an alert to confirm if the user really wants to cancel
    Alert.alert("Cancel", "Are you sure you want to cancel?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          setText(""); // Clear the input if they confirm the cancel action
          dismissModal(); // Close the modal
        },
      },
    ]);
  }

  // Handle the text change as the user types
  function handleTextChange(changedText) {
    setText(changedText);
  }

  return (
    <Modal animationType="slide" visible={isModalVisible}>
      <View style={styles.container}>
        <View style={styles.modalContent}>
          {/* Network image */}
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png" }}
            style={styles.image}
            alt="Network image"
          />
          {/* Local image */}
          <Image
            source={require("../assets/target.png")}
            style={styles.image}
            alt="Local image"
          />
          {/* Text input field */}
          <TextInput
            autoFocus={textInputFocus}
            placeholder="Type something"
            autoCorrect={true}
            keyboardType="default"
            value={text}
            style={styles.input}
            onChangeText={handleTextChange}
            onBlur={() => {
              setBlur(true); // Set blur to true when the input loses focus
            }}
            onFocus={() => {
              setBlur(false); // Remove blur state when input is focused again
            }}
          />

          {/* Conditional rendering for character validation */}
          {blur ? (
            text.length >= minimumChar ? (
              <Text>Thank you</Text>
            ) : (
              <Text>Please type more than {minimumChar} characters</Text>
            )
          ) : (
            text.length > 0 && <Text>{text.length}</Text> // Show the character count while typing
          )}

          {/* Button container */}
          <View style={styles.buttonContainer}>
            <Button
              title="Confirm"
              onPress={handleConfirm}
              disabled={text.length < minimumChar} // Disable confirm if minimum characters aren't met
            />
            <Button title="Cancel" onPress={handleCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "purple",
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
    width: "80%", // Adjust input width to better fit the screen
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  modalContent: {
    borderRadius: 6,
    backgroundColor: "#ddd",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});