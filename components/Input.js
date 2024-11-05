import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Modal,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import ImageManager from "./ImageManager"; // Import ImageManager component

export default function Input({
  autoFocus,
  inputHandler,
  modalVisible,
  cancelHandler,
}) {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [showCount, setShowCount] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const inputRef = useRef(null);

  // Automatically focus on the input field if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Confirm button is enabled if text length is 3 or more
  useEffect(() => {
    setConfirmed(text.length >= 3);
  }, [text]);

  // Handler for confirm button
  function handleConfirm() {
    inputHandler(text);
    setText("");
  }

  // Handler for when TextInput loses focus
  const handleBlur = () => {
    setMessage(text.length >= 3 ? "Thank you" : "Please type more than 3 characters");
    setShowCount(false);
  };

  // Handler for cancel button with alert
  function handleCancel() {
    Alert.alert("isCancel", "Do you want to cancel?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          cancelHandler();
          setText("");
        },
      },
    ]);
  }

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Display static images */}
          <Image
            style={styles.image}
            source={require("../assets/target.png")}
            alt={"Image of an arrow"}
          />
          <Image
            style={styles.image}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png",
            }}
            alt={"Image of an arrow"}
          />

          {/* TextInput for user input with character count */}
          <TextInput
            style={styles.input}
            ref={inputRef}
            placeholder="Type something"
            keyboardType="default"
            value={text}
            onChangeText={(changedText) => {
              setText(changedText);
              setShowCount(changedText.length > 0);
            }}
            onBlur={handleBlur}
          />
          {showCount && (
            <Text style={{ color: "gray", marginTop: 5 }}>
              Character count: {text.length}
            </Text>
          )}
          {message && (
            <Text style={{ color: "gray", marginTop: 5 }}>{message}</Text>
          )}

          {/* Buttons for cancel and confirm */}
          <View style={styles.button}>
            <Button onPress={handleCancel} title="Cancel" />
            <Button
              onPress={handleConfirm}
              disabled={!confirmed}
              title="Confirm"
            />
          </View>

          {/* Render ImageManager component for camera functionality */}
          <ImageManager />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: { borderColor: "purple", borderWidth: 2, padding: 5, color: "purple" },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
  },
  modalContent: {
    backgroundColor: "darkgray",
    alignItems: "center",
    justifyContent: "center",
    height: "60%", // Adjusted height to fit the camera button and image display
    width: "80%",
    borderRadius: 20,
    padding: 10,
    marginTop: 50,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});