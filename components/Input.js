import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";

export default function Input({
  textInputFocus,
  inputHandler,
  isModalVisible,
  dismissModal,
}) {
  const [text, setText] = useState("");
  const [blur, setBlur] = useState(false);
  const minimumChar = 3;

  function handleConfirm() {
    inputHandler(text);
    setText("");
  }

  function handleCancel() {
    Alert.alert("Cancel", "Are you sure you want to cancel?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          setText("");
          dismissModal();
        },
      },
    ]);
  }

  function handleTextChange(changedText) {
    setText(changedText);
  }

  return (
    <Modal animationType="slide" visible={isModalVisible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.modalContent}>
          {/* Network image */}
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png",
            }}
            style={styles.image}
            alt="Network image"
          />
          {/* Local image */}
          <Image
            source={require("../assets/target.png")}
            style={styles.image}
            alt="Local image"
          />
          <TextInput
            autoFocus={textInputFocus}
            placeholder="Type something"
            autoCorrect={true}
            keyboardType="default"
            value={text}
            style={styles.input}
            onChangeText={handleTextChange}
            onBlur={() => setBlur(true)}
            onFocus={() => setBlur(false)}
          />

          {blur ? (
            text.length >= minimumChar ? (
              <Text>Thank you</Text>
            ) : (
              <Text>Please type more than {minimumChar} characters</Text>
            )
          ) : (
            text.length > 0 && <Text>{text.length}</Text>
          )}

          <View style={styles.buttonContainer}>
            <Button
              title="Confirm"
              onPress={handleConfirm}
              disabled={text.length < minimumChar}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  input: {
    borderColor: "purple",
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
    width: "80%",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  modalContent: {
    borderRadius: 6,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});