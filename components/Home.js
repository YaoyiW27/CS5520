import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
} from "react-native";
import Header from "./Header";
import { useState } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";

export default function Home() {
  const [receivedData, setReceivedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My app!";

  function handleInputData(data) {
    console.log("App.js ", data);
    let newGoal = { text: data, id: Math.random() };

    setGoals((prevGoals) => {
      return [...prevGoals, newGoal];
    });
    // setReceivedData(data);
    setModalVisible(false);
  }
  function dismissModal() {
    setModalVisible(false);
  }
  function handleGoalDelete(deletedId) {
    setGoals((prevGoals) => {
      return prevGoals.filter((goalObj) => {
        return goalObj.id != deletedId;
      });
    });
  }
  function handleDeleteAll() {
    Alert.alert("Delete All", "Are you sure you want to delete all goals", [
      {
        text: "Yes",
        onPress: () => {
          setGoals([]);
        },
      },
      { text: "No", style: "cancel" },
    ]);
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
        dismissModal={dismissModal}
      />
      <View style={styles.bottomView}>
        <FlatList
          contentContainerStyle={styles.scrollViewContainer}
          data={goals}
          renderItem={({ item }) => {
            return <GoalItem deleteHandler={handleGoalDelete} goalObj={item} />;
          }}
          ListEmptyComponent={
            <View>
              <Text style={styles.noGoalsText}>No goals to show</Text>
            </View>
          }
          ListHeaderComponent={
            goals.length > 0 ? (
            <View>
              <Text style={styles.myGoalsText}>My Goals List</Text>
            </View>
            ) : null
          } 
          ListFooterComponent={
            goals.length > 0 ? (
            <Button title="Delete All" onPress={handleDeleteAll} />
            ) : null
          }
          ItemSeparatorComponent={({ leadingItem }) => {
            if (leadingItem) {
              return <View style={styles.separatorLine}></View>;
            } else {
              return null;
            }
          }}
        />
        {/* <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {goals.map((goalObj) => {
            return (
              <View key={goalObj.id} style={styles.textContainer}>
                <Text style={styles.text}>{goalObj.text}</Text>
              </View>
            );
          })}
        </ScrollView> */}
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
  scrollViewContainer: {
    alignItems: "center",
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: { 
    flex: 4, 
    backgroundColor: "#dcd" 
  },
  noGoalsText: {
    color: "purple",
    fontSize: 18,
  },
  myGoalsText: {
    color: "purple",
    fontSize: 18,
    marginBottom: 5,
  },
  separatorLine: {
    height: 3,
    backgroundColor: "gray", 
    marginVertical: 5,
    marginTop: 15,
  },
});