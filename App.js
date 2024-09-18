import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import { useState } from "react";
import Input from "./components/Input";

export default function App() {
  const [receivedData, setReceivedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const appName = "My app!";
  
  function handleInputData(data) {
    console.log("App.js ", data);
    setReceivedData(data);
    setModalVisible(false);
  }

  function handleCancel() {
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName}></Header>
        <Button
          title="Add a Goal"
          onPress={function () {
            setModalVisible(true);
          }}
        />
      </View>
      <Input
        textInputFocus={true}
        inputHandler={handleInputData}
        isModalVisible={modalVisible}
        onCancel={handleCancel} 
      />
      <View style={styles.bottomView}>
        <Text style={styles.text}>{receivedData}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "pink",
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: { flex: 4, backgroundColor: "#d5d", alignItems: "center" },
});