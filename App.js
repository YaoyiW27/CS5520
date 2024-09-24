import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, FlatList, View } from "react-native";
import Header from "./components/Header";
import { useState } from "react";
import Input from "./components/Input";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([
    { text: "Study", id: Math.random() },
    { text: "Exercise", id: Math.random() },
    { text: "Quiz", id: Math.random() },
  ]);

  // Handle adding a goal
  function handleInputData(data) {
    const newGoal = { text: data, id: Math.random() };
    setGoals((currentGoals) => [...currentGoals, newGoal]);
    setModalVisible(false);
  }

  // Handle deleting a goal
  function deleteGoal(goalId) {
    setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== goalId));
  }

  function dismissModal() {
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name="My app!" />
        <Button title="Add a Goal" onPress={() => setModalVisible(true)} />
      </View>
      <Input
        textInputFocus={true}
        inputHandler={handleInputData}
        isModalVisible={modalVisible}
        dismissModal={dismissModal}
      />

      <FlatList
        style={styles.bottomView}
        data={goals}
        renderItem={({ item }) => (
          <GoalItem goal={item} onDelete={deleteGoal} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topView: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: "#dcd",
    paddingHorizontal: 10,
  },
});