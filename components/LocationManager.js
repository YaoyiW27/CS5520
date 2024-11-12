import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import * as Location from 'expo-location';

export default function LocationManager() {
  const [location, setLocation] = useState(null);
  const [response, requestPermission] = Location.useForegroundPermissions();

  async function verifyPermission() {
    try {
      if (!response) {
        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
      }
      
      if (!response.granted) {
        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
      }

      return response.granted;
    } catch (err) {
      console.log("Error verifying permission:", err);
      return false;
    }
  }

  async function locateUserHandler() {
    try {
      const hasPermission = await verifyPermission();
      
      if (!hasPermission) {
        Alert.alert(
          "Insufficient permissions!",
          "You need to grant location permissions to use this app.",
          [{ text: "Okay" }]
        );
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High 
      });

      setLocation(currentLocation);
      console.log("Current location:", currentLocation);
    } catch (err) {
      console.log("Error getting location:", err);
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or check your device settings.",
        [{ text: "Okay" }]
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button 
          title="Get Location" 
          onPress={locateUserHandler}
        />
      </View>
      
      {location && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            Latitude: {location.coords.latitude}
          </Text>
          <Text style={styles.locationText}>
            Longitude: {location.coords.longitude}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  locationContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    marginVertical: 4,
  }
});