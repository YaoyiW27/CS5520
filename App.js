import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import  Header from "./components/Header";
import { useState } from "react";
import Input from './components/Input';

export default function App() {
  const [text, setText] = useState("");
  const appName = "My Mobile App";


  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.headerContainer}>
            <Header name={appName} />
            <View style={styles.buttonContainer}>
                <Button title="Add a goal" onPress={() => {}} />
            </View>
        </View>
        <Input autoFocus={true} onConfirm={handleInputData} />
        <View style={styles.bottomSection}>
            <Text style={styles.confirmedText}>{text ? `Confirmed Input: ${text}` : ''}</Text>
        </View>
    </SafeAreaView>
);
}

const handleInputData = (inputText) => {
  console.log("Input received: ", inputText);
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  headerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonContainer: {
      marginTop: 10,
      width: '30%',
  },
  bottomSection: {
      flex: 1,
      backgroundColor: '#e6d5f7',  
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
  },
  confirmedText: {
      fontSize: 18,
      color: '#6a0dad',
      borderWidth: 1,
      borderColor: 'purple',
      padding: 10,
      borderRadius: 10,  
  },
});
