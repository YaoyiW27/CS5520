import { TextInput, StyleSheet, Text, View } from 'react-native'
import { useState, useRef, useEffect } from "react";

export default function Input(autoFocus) {
    const [text, setText] = useState("");
    const inputRef = useRef(null);

  return (
    <TextInput
      ref={inputRef}
      placeholder="Type something"
      autoCorrect={true}
      keyboardType="default"
      value={text}
      style={{borderBottomColor: "purple", borderBottomWidth: 2}}
      onChangeText={setText}
    />
  )
}

const styles = StyleSheet.create({})