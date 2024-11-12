import { Button, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "./PressableButton";
import Entypo from '@expo/vector-icons/Entypo';
import { addWarningToGoal } from "../Firebase/firestoreHelper";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Firebase/firebaseSetup";

export default function GoalDetails({ navigation, route }) {
  const [warning, setWarning] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  // Function to handle the warning state and update navigation title
  const handleWarning = async () => {
    setWarning(true);
    navigation.setOptions({
      title: "Warning",
    });

    if (route.params && route.params.goalData && route.params.goalData.id) {
      await addWarningToGoal(route.params.goalData.id);
    }
  };

  // Function to fetch image URL from Firebase Storage
  useEffect(() => {
    if (route.params?.goalData?.imageUri) {
      const reference = ref(storage, route.params.goalData.imageUri);
      getDownloadURL(reference)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          console.error("Failed to load image:", error);
        });
    }

    // Set up warning button in the header
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
  }, [navigation, handleWarning, route.params?.goalData?.imageUri]);

  // Function to navigate to more details
  function moreDetailsHandler() {
    navigation.push("Details");
  }

  return (
    <View style={styles.container}>
      {route.params ? (
        <Text style={warning && styles.warningStyle}>
          This is details of a goal with text "{route.params.goalData.text}" and
          id "{route.params.goalData.id}"
        </Text>
      ) : (
        <Text style={warning && styles.warningStyle}>More Details</Text>
      )}
      
      {/* Display the fetched image if available */}
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
        />
      )}

      <Button title="More Details" onPress={moreDetailsHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  warningStyle: {
    color: "red",
  },
  warningButtonPressed: {
    backgroundColor: "yellow",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});