import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
  Alert,
  Pressable,
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
  // writeToDB({name: "yy"}, "goals");
  // console.log(database);
  const [receivedData, setReceivedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  const appName = "My awesome app";

  useEffect(() => {
    onSnapshot(collection(database, "goals"), (querySnapshot) => { 
      let newArray = [];
      if (!querySnapshot.empty) {
        querySnapshot.forEach((docSnapshot) => {
          console.log(docSnapshot.data());
          newArray.push({ id: docSnapshot.id, ...docSnapshot.data() });
        });
      }
      setGoals(newArray);
    });
  }, []);

  function handleInputData(data) {
    console.log("App.js ", data);

    let newGoal = { text: data };
    writeToDB("goals", newGoal);
    // console.log("App.js knows new goal is added");
    // setGoals((prevGoals) => {
    //   return [...prevGoals, newGoal];
    // });

    setReceivedData(data);
    setModalVisible(false);
  }

  function isModalVisible() {
    setModalVisible(true);
  }

  function handleCancelInput() {
    setModalVisible(false);
  }

  function handleDelete(deletedId) {
    // console.log("App.js knows goal is deleted");
    // const newGoals = goals.filter((goalObj) => {
    //   return goalObj.id !== deletedId;
    // });
    setGoals((prevGoals) => {
      return prevGoals.filter((goalObj) => {
        return goalObj.id !== deletedId;
      });
    });

    deleteFromDB("goals", deletedId);
  }


  function deleteAllGoals() {
    Alert.alert("Delete all", "Are you sure?", [
      {
        text: "Yes",
        onPress: () => {
          // setGoals([]);
          deleteAll("goals");
        },
      },
      {
        text: "No",
        onPress: () => {
          console.log("Delete cancelled");
        },
      },
    ]);
  }

  function renderSeparator({ highlighted }) {
    return (
      <View
        style={[
          styles.seperators,
          highlighted ? styles.seperatorHighlighted : null,
        ]}
      />
    );
  }

  // function handleGoalPress(pressGoal) {
  //   console.log(pressGoal);
  //   navigation.navigate("Details", { goalData: pressGoal });
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <StatusBar style="auto" />
        <Header name={appName}>
          {/* <Text>child 1</Text>
        <Text>child 2</Text> */}
        </Header>
        <PressableButton
          onPress={isModalVisible}
          componentStyle={styles.buttonDefault}
          pressedStyle={styles.buttonPressed}
        >
          <Text style={styles.buttonText}>Add a goal</Text>
        </PressableButton>

        {/* <Button title="Add a Goal" onPress={isModalVisible} /> */}
        <Input
          autoFocus={true}
          inputHandler={handleInputData}
          modalVisible={modalVisible}
          cancelHandler={handleCancelInput}
        />
      </View>
      <View style={styles.bottomView}>
        <FlatList
          contentContainerStyle={styles.scrollViewContainer}
          // ListEmptyComponent={<Text style={styles.text}>No goals to show</Text>}
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
          renderItem={({ item, separators }) => {
            return (
              <GoalItem
                deleteHandler={handleDelete}
                goalObj={item}
                onPressIn={() => separators.highlight()}
                onPressOut={() => separators.unhighlight()}
              />
            );
          }}
        />

        {/* <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Text style={styles.text}>{receivedData}</Text> 
          {goals.map((goalObj) => {
            return (
              <View style={styles.textContainer}>
                <Text style={styles.text} key={goalObj.id}>
                  {goalObj.text}
                </Text>
              </View>
            );
          })}
        </ScrollView>*/}
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
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: {
    flex: 4,
    backgroundColor: "#d8bfd8",
    alignItems: "center",
  },
  scrollViewContainer: {
    // alignItems: "center",
  },
  text: {
    color: "purple",
    fontSize: 20,
    marginTop: 10,
    alignSelf: "center",
  },
  seperators: {
    height: 4,
    width: "100%",
    backgroundColor: "gray",
    alignSelf: "center",
  },
  seperatorHighlighted: {
    backgroundColor: "purple",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    padding: 5,
  },
  buttonDefault: {
    backgroundColor: "purple",
    margin: 10,
    padding: 5,
  },
  buttonPressed: {
    backgroundColor: "blue",
  },
});