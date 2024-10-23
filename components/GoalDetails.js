import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "./PressableButton";
import Entypo from '@expo/vector-icons/Entypo';
import { addWarningToGoal } from "../Firebase/firestoreHelper";
import GoalUsers from "./GoalUsers";

export default function GoalDetails({ navigation, route }) {
  // console.log(route.params.goalData);

  const [warning, setWarning] = useState(false);

  const handleWarning = async () => {
    setWarning(true);
    navigation.setOptions({
      title: "Warning",
    });

    if (route.params && route.params.goalData && route.params.goalData.id) {
      await addWarningToGoal(route.params.goalData.id);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          onPress={handleWarning}
          componentStyle={styles.warningStyle}
          pressedStyle={styles.warningButtonPressed}
        >
          <Entypo name="warning" size={24} color="red" />
        </PressableButton>
      ),
    });
  }, [navigation, handleWarning]);

  function moreDetailsHandler() {
    navigation.push("Details");
  }

  return (
    <View>
      {route.params ? (
        <Text style={warning && styles.warningStyle}>
          This is details of a goal with text {route.params.goalData.text} and
          id {route.params.goalData.id}
        </Text>
      ) : (
        <Text style={warning && styles.warningStyle}>More Details</Text>
      )}
      <Button title="More Details" onPress={moreDetailsHandler} />
      <GoalUsers id={route.params.goalData.id}/>
    </View>
  );
}

const styles = StyleSheet.create({
  warningStyle: {
    color: "red",
  },

  warningButtonPressed: {
    backgroundColor: "yellow",
  },
});