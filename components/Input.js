import { TextInput, StyleSheet, Text, View, Button, Modal } from 'react-native'
import { useState, useRef, useEffect } from "react";

export default function Input( { autoFocus, onConfirm } ) {
  const [text, setText] = useState("");
  const [showCount, setShowCount] = useState(false);
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if(autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleBlur = () => {  
    setShowCount(false);
    if(text.length >= 3) {
      setMessage("Thank you");
    } else {
      setMessage("Please type more than 3 characters");
    }
  }

  const handleConfirm = () => {
    console.log(text);
    onConfirm(text);
    setText(text);
    setModalVisible(false);
  }


  return (
    <View style={styles.container}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <TextInput
                        ref={inputRef}
                        placeholder="Type something"
                        autoCorrect={true}
                        keyboardType="default"
                        value={text}
                        style={styles.input}
                        onChangeText={setText}
                        onBlur={handleBlur}
                        onFocus={() => setShowCount(true)}
                    />
                    {showCount && text.length > 0 && (
                        <Text style={styles.characterCount}>Character Count: {text.length}</Text>
                    )}
                    {message.length > 0 && <Text style={styles.message}>{message}</Text>}
                    <View style={styles.buttonContainer}>
                        <Button title="Confirm" onPress={handleConfirm} />
                    </View>
                </View>
            </View>
        </Modal>
        <Button title="Open Modal" onPress={() => setModalVisible(true)} />
    </View>
);
}

const styles = StyleSheet.create({
  container: {
      margin: 20,
      alignItems: 'center',
  },
  input: {
      width: '80%',
      borderBottomColor: "purple",
      borderBottomWidth: 2,
      padding: 10,
      marginVertical: 10,
  },
  characterCount: {
      fontSize: 14,
      color: 'gray',
      marginTop: 5,
  },
  message: {
      marginTop: 10,
      fontSize: 16,
      color: '#6a0dad',
  },
  buttonContainer: {
      width: '30%',
      marginTop: 20,
  },
  modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',  
  },
  modalView: {
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
  },
});