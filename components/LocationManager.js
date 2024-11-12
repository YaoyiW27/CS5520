import { View, Text, Button, StyleSheet, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { googleMapsConfig } from '../Firebase/firebaseSetup';

export default function LocationManager() {
  // State for location and map url
  const [locationData, setLocationData] = useState({
    latitude: null,
    longitude: null
  });
  const [mapUrl, setMapUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Hook to handle location permissions
  const [response, requestPermission] = Location.useForegroundPermissions();

  // Update map URL when location changes
  useEffect(() => {
    if (locationData.latitude && locationData.longitude) {
      const url = `https://maps.googleapis.com/maps/api/staticmap?center=${locationData.latitude},${locationData.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${locationData.latitude},${locationData.longitude}&key=${googleMapsConfig.apiKey}`;
      setMapUrl(url);
      console.log("Map URL generated:", url); // Debug log
    }
  }, [locationData]);

  // Check and request location permissions
  async function verifyPermission() {
    try {
      if (!response || !response.granted) {
        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
      }
      return response.granted;
    } catch (err) {
      console.log("Error verifying permission:", err);
      return false;
    }
  }

  // Handler to get current location
  async function locateUserHandler() {
    try {
      setLoading(true);
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

      setLocationData({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude
      });
      
      console.log("Location updated:", currentLocation.coords);
    } catch (err) {
      console.error("Error getting location:", err);
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or check your device settings.",
        [{ text: "Okay" }]
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Button 
        title="FIND MY LOCATION"
        onPress={locateUserHandler}
        color="#2196F3"
      />

      {locationData.latitude && locationData.longitude && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            Latitude: {locationData.latitude.toFixed(6)}
          </Text>
          <Text style={styles.locationText}>
            Longitude: {locationData.longitude.toFixed(6)}
          </Text>
          
          {mapUrl && (
            <View style={styles.mapContainer}>
              <Image
                source={{ uri: mapUrl }}
                style={styles.map}
                resizeMode="cover"
                onError={(error) => {
                  console.error("Map image loading error:", error);
                }}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  locationContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    marginVertical: 4,
    color: '#666',
  },
  mapContainer: {
    width: '100%',
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: 200,
  }
});