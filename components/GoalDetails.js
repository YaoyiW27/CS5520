import { Button, StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "./PressableButton";
import Entypo from '@expo/vector-icons/Entypo';
import { addWarningToGoal } from "../Firebase/firestoreHelper";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Firebase/firebaseSetup";

export default function GoalDetails({ navigation, route }) {
  const [warning, setWarning] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadImage() {
      if (route.params?.goalData?.imageUri) {
        setLoading(true);
        try {
          console.log("Fetching image from path:", route.params.goalData.imageUri);
          const reference = ref(storage, route.params.goalData.imageUri);
          const url = await getDownloadURL(reference);
          console.log("Image URL retrieved:", url);
          setImageUrl(url);
        } catch (error) {
          console.error("Failed to load image:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    loadImage();

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
  }, [navigation, route.params?.goalData?.imageUri]);

  const handleWarning = async () => {
    setWarning(true);
    navigation.setOptions({
      title: "Warning",
    });

    if (route.params?.goalData?.id) {
      await addWarningToGoal(route.params.goalData.id);
    }
  };

  function moreDetailsHandler() {
    navigation.push("Details");
  }

  return (
    <View style={styles.container}>
      <Text style={warning ? styles.warningStyle : styles.goalText}>
        {route.params 
          ? `This is details of a goal with text "${route.params.goalData.text}" and id "${route.params.goalData.id}"`
          : "More Details"
        }
      </Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="purple" style={styles.loader} />
      ) : imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : null}

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
    width: 300,
    height: 300,
    marginVertical: 20,
    borderRadius: 15,
  },
  goalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  loader: {
    marginVertical: 20,
  }
});