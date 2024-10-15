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
import React from "react";
import { useState, useEffect, useRef } from "react";

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

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (text.length >= 3) {
      setConfirmed(true);
    } else {
      setConfirmed(false);
    }
  });

  function handleConfirm() {
    // console.log(text);
    inputHandler(text);
    setText("");
  }

  const handleBlur = () => {
    if (text.length >= 3) {
      setMessage("Thank you");
    } else {
      setMessage("Please type more than 3 characters");
    }
    setShowCount(false);
  };

  function handleCancel() {
    Alert.alert("isCancel", "Do you want to cancel?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancel Pressed");
        },
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
          <Image
            style={styles.image}
            source={require("../assets/target.png")}
            alt={"Image of a an arrow"}
          />
          <Image
            style={styles.image}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png",
            }}
            alt={"Image of a an arrow"}
          />
          <TextInput
            style={styles.input}
            ref={inputRef}
            placeholder="Type something"
            keyboardType="default"
            value={text}
            onChangeText={function (changedText) {
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
          <View style={styles.button}>
            <Button onPress={handleCancel} title="Cancel" />
            <Button
              onPress={handleConfirm}
              disabled={!confirmed}
              title="Confirm"
            />
          </View>
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
    height: "40%",
    width: "60%",
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