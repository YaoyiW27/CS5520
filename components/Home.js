import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import Header from "./Header";
import Input from "./Input";
import { useState, useEffect } from "react";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import { database } from "../Firebase/firebaseSetup";
import { writeToDB, deleteFromDB, deleteAll } from "../Firebase/firestoreHelper";
import { collection, onSnapshot } from 'firebase/firestore';

export default function Home({ navigation, route }) {
  const [receivedData, setReceivedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My awesome app";

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, "goals"), (querySnapshot) => {
      let newArray = [];
      if (!querySnapshot.empty) {
        querySnapshot.forEach((docSnapshot) => {
          newArray.push({ id: docSnapshot.id, ...docSnapshot.data() });
        });
      }
      setGoals(newArray);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  function handleInputData(data) {
    console.log("Received data:", data);

    let newGoal = { text: data.text, imageUri: data.imageUri };
    writeToDB("goals", newGoal);

    setReceivedData(data.text); // Store the text received for debugging if needed
    setModalVisible(false); // Close the modal after submission
  }

  function isModalVisible() {
    console.log("Add a Goal button clicked");
    setModalVisible(true);
  }

  function handleCancelInput() {
    setModalVisible(false);
  }

  function handleDelete(deletedId) {
    setGoals((prevGoals) => prevGoals.filter((goalObj) => goalObj.id !== deletedId));
    deleteFromDB("goals", deletedId);
  }

  function deleteAllGoals() {
    Alert.alert("Delete all", "Are you sure?", [
      {
        text: "Yes",
        onPress: () => {
          deleteAll("goals");
        },
      },
      { text: "No", onPress: () => console.log("Delete cancelled") },
    ]);
  }

  function renderSeparator({ highlighted }) {
    return (
      <View
        style={[
          styles.separators,
          highlighted ? styles.separatorHighlighted : null,
        ]}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <StatusBar style="auto" />
        <Header name={appName} />

        {/* "Add a Goal" Button */}
        <PressableButton
          onPress={isModalVisible}
          componentStyle={styles.buttonDefault}
          pressedStyle={styles.buttonPressed}
        >
          <Text style={styles.buttonText}>Add a goal</Text>
        </PressableButton>

        {/* Input Modal for Adding Goal */}
        <Input
          autoFocus={true}
          inputHandler={handleInputData} // Function to handle data received from Input.js
          modalVisible={modalVisible} // Control visibility of Input modal
          cancelHandler={handleCancelInput} // Function to handle cancel action
        />
      </View>

      {/* Goals List */}
      <View style={styles.bottomView}>
        <FlatList
          contentContainerStyle={styles.scrollViewContainer}
          ItemSeparatorComponent={renderSeparator}
          ListHeaderComponent={() =>
            goals.length > 0 ? (
              <Text style={styles.text}>My goals</Text>
            ) : (
              <Text style={styles.text}>No goals to show</Text>
            )
          }
          ListFooterComponent={() =>
            goals.length > 0 ? (
              <View>
                <Button title="Delete All" onPress={deleteAllGoals} />
              </View>
            ) : null
          }
          data={goals}
          renderItem={({ item, separators }) => (
            <GoalItem
              deleteHandler={handleDelete}
              goalObj={item}
              onPressIn={() => separators.highlight()}
              onPressOut={() => separators.unhighlight()}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "center" },
  topView: { flex: 1, alignItems: "center", justifyContent: "center" },
  bottomView: { flex: 4, backgroundColor: "#d8bfd8", alignItems: "center" },
  text: { color: "purple", fontSize: 20, marginTop: 10, alignSelf: "center" },
  separators: { height: 4, width: "100%", backgroundColor: "gray" },
  separatorHighlighted: { backgroundColor: "purple" },
  buttonText: { color: "white", fontSize: 20, padding: 5 },
  buttonDefault: { backgroundColor: "purple", margin: 10, padding: 5 },
  buttonPressed: { backgroundColor: "blue" },
});