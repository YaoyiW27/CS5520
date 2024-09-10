import { StyleSheet, Text, View } from 'react-native'
import { useState } from "react";
import { TextInput } from "react-native";

export default function Input() {
    const [text, setText] = useState("");

  return (
    <TextInput
    placeholder="Type something"
    autoCorrect={true}
    keyboardType="default"
    value={text}
    style={{borderBottomColor: "purple", borderBottomWidth: 2}}
    onChangeText={function (changedText){
    console.log(changedText);
    }}
    />
  )
}

const styles = StyleSheet.create({})