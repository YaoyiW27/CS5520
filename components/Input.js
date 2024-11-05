import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Modal, Alert, Image } from 'react-native';
import ImageManager from './ImageManager';

export default function Input({ autoFocus, inputHandler, modalVisible, cancelHandler }) {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [showCount, setShowCount] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [imageUri, setImageUri] = useState(null); // State to store the image URI
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    setConfirmed(text.length >= 3);
  }, [text]);

  const handleConfirm = () => {
    // Pass text and image URI to Home.js via inputHandler
    inputHandler({ text, imageUri });
    setText("");
    setImageUri(null); // Clear the image after confirming
  };

  const handleBlur = () => {
    setMessage(text.length >= 3 ? "Thank you" : "Please type more than 3 characters");
    setShowCount(false);
  };

  const handleImageTaken = (uri) => {
    setImageUri(uri); // Save the image URI from ImageManager
  };

  const handleCancel = () => {
    Alert.alert("isCancel", "Do you want to cancel?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          cancelHandler();
          setText("");
          setImageUri(null);
        },
      },
    ]);
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
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
          {showCount && <Text style={{ color: "gray", marginTop: 5 }}>Character count: {text.length}</Text>}
          {message && <Text style={{ color: "gray", marginTop: 5 }}>{message}</Text>}

          <View style={styles.button}>
            <Button onPress={handleCancel} title="Cancel" />
            <Button onPress={handleConfirm} disabled={!confirmed} title="Confirm" />
          </View>

          {/* Pass the handleImageTaken function to ImageManager */}
          <ImageManager onImageTaken={handleImageTaken} />
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