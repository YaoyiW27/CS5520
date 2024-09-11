import { TextInput, StyleSheet, Text, View } from 'react-native'
import { useState, useRef, useEffect } from "react";

export default function Input(autoFocus) {
    const [text, setText] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
      if(autoFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [autoFocus]);

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
      />
      {text.length < 0 && <Text>Character Count: {text.length}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({})