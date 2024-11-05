import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager({ onImageTaken }) { // Accept the callback prop
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [selectedImage, setSelectedImage] = useState(null); // State to store the URI of the captured image

  // Function to check camera permissions
  const verifyPermission = async () => {
    if (response.granted) {
      return true; // Permission is already granted
    }
    const permissionResult = await requestPermission(); // Request permission if not granted
    return permissionResult.granted;
  };

  // Function to handle capturing an image with permission check
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert("Permission required", "Camera access is needed to take a photo.");
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri; // Get the URI of the image
        setSelectedImage(imageUri); // Store URI for preview
        onImageTaken(imageUri); // Pass URI back to Input.js
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