import { TextInput, StyleSheet, Text, View, Button } from 'react-native'
import { useState, useRef, useEffect } from "react";

export default function Input( { autoFocus } ) {
  const [text, setText] = useState("");
  const [showCount, setShowCount] = useState(false);
  const [message, setMessage] = useState("");
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
  }


  return (
    <View>
      <TextInput
        ref={inputRef}
        placeholder="Type something"
        autoCorrect={true}
        keyboardType="default"
        value={text}
        style={{borderBottomColor: "purple", borderBottomWidth: 2}}
        onChangeText={setText}
        onBlur={handleBlur}
        onFocus={() => setShowCount(true)}
      />
      {showCount && text.length > 0 && <Text>Character Count: {text.length}</Text>}
      {message.length > 0 && <Text>{message}</Text>}
      <Button 
        title="Confirm" 
        onPress={handleConfirm}
      />
    </View>
  )
}

const styles = StyleSheet.create({})