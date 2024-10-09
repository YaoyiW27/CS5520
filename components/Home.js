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

export default function Home({ navigation }) {
  const [receivedData, setReceivedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My app!";

  function handleInputData(data) {
    let newGoal = { text: data, id: Math.random().toString() }; // Ensure ID is a string
    setGoals(prevGoals => [...prevGoals, newGoal]);
    setModalVisible(false);
  }

  function dismissModal() {
    setModalVisible(false);
  }

  function handleGoalDelete(deletedId) {
    setGoals(prevGoals => prevGoals.filter(goalObj => goalObj.id !== deletedId));
  }

  function deleteAll() {
    Alert.alert("Delete All", "Are you sure you want to delete all goals?", [
      { text: "Yes", onPress: () => setGoals([]) },
      { text: "No", style: "cancel" }
    ]);
  }

  const renderItem = ({ item, separators }) => (
    <GoalItem
      goalObj={item}
      deleteHandler={handleGoalDelete}
      navigation={navigation}
      onHighlight={() => separators.highlight()}
      onUnhighlight={() => separators.unhighlight()}
    />
  );

  const ItemSeparator = ({ highlighted }) => (
    <View style={{ height: 5, backgroundColor: highlighted ? "purple" : "gray" }} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName} />
        <Button title="Add a Goal" onPress={() => setModalVisible(true)} />
      </View>
      <Input textInputFocus={true} inputHandler={handleInputData} isModalVisible={modalVisible} dismissModal={dismissModal} />
      <View style={styles.bottomView}>
        <FlatList
          ItemSeparatorComponent={ItemSeparator}
          ListEmptyComponent={<Text style={styles.header}>No goals to show</Text>}
          ListHeaderComponent={goals.length > 0 ? <Text style={styles.header}>My Goals List</Text> : null}
          ListFooterComponent={goals.length > 0 ? <Button title="Delete all" onPress={deleteAll} /> : null}
          contentContainerStyle={styles.scrollViewContainer}
          data={goals}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  bottomView: { flex: 4, backgroundColor: "#dcd" },
  header: {
    color: "indigo",
    fontSize: 25,
    marginTop: 10,
  },
});