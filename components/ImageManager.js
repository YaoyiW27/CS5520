import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager() {
  const [response, requestPermission] = ImagePicker.useCameraPermissions(); // Request camera permission
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle taking an image, with permission check
  const takeImageHandler = async () => {
    // Check if permission is granted
    if (!response.granted) {
      const permissionResult = await requestPermission();
      if (!permissionResult.granted) {
        Alert.alert("Permission required", "Camera access is needed to take a photo.");
        return;
      }
    }

    // If permission is granted, launch the camera
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true, // Allows user to edit the image before saving
        quality: 1, // Sets the image quality to the highest
      });

      // If the user didn't cancel, save the image URI in state
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      } else {
        Alert.alert('Camera canceled');
      }
    } catch (error) {
      console.error("Error opening camera:", error);
      Alert.alert("Error", "Could not open camera. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take a Photo" onPress={takeImageHandler} />
      {/* Display the captured image if available */}
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});