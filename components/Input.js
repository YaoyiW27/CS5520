import { Button, Modal, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import React, { useState } from "react";

export default function Input({
  textInputFocus,
  inputHandler,
  isModalVisible,
  onCancel
}) {
  const [text, setText] = useState("");
  const [blur, setBlur] = useState(false);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);  

  function handleConfirm() {
    // console.log(text);
    inputHandler(text); 
    setText("");
  }

  function handleCancelPress() {
    Alert.alert(
      "Are you sure?",
      "Do you want to cancel?",
      [
        {
          text: "No",
          style: "cancel",
        },
        { 
          text: "Yes",
          onPress: () => {
            onCancel();
            setText("");
          }
        },
      ],
      { cancelable: false }
    )
  }

  function handleTextChange(changedText) {
    setText(changedText);
    if (changedText.length >= 3) {
      setIsConfirmDisabled(false); 
    } else {
      setIsConfirmDisabled(true);  
    }
  }

  return (
    <Modal animationType="slide" visible={isModalVisible}>
      <View style={styles.container}>
        <TextInput
          autoFocus={textInputFocus}
          placeholder="Type something"
          autoCorrect={true}
          keyboardType="default"
          value={text}
          style={styles.input}
          onChangeText={handleTextChange}
          onBlur={() => {
            setBlur(true);
          }}
          onFocus={() => {
            setBlur(false);
          }}
        />

        {blur ? (
          text.length >= 3 ? (
            <Text>Thank you</Text>
          ) : (
            <Text>Please type more than 3 characters</Text>
          )
        ) : (
          text && <Text>{text.length}</Text>
        )}
        <View style={styles.buttonContainer}>
          <Button title="Confirm" onPress={handleConfirm} disabled={isConfirmDisabled} />
          <Button title="Cancel" onPress={handleCancelPress} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  input: { borderColor: "pink", borderWidth: 2, padding: 5 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
});