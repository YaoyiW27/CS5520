import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  Header from "./components/Header";
import { useState } from "react";
import Input from './components/Input';

export default function App() {
  const [text, setText] = useState("");
  const appName = "My First App";

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName}></Header>
      <Input autoFocus={true} onConfirm={handleInputData}/>
      <Text>{text}</Text>
    </View>
  );
}

const handleInputData = (inputText) => {
  setText(inputText)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
