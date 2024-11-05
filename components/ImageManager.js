import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Handler to open the camera and capture an image
  const takeImageHandler = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true, 
        quality: 1, 
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
