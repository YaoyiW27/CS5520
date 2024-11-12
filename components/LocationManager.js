import { View, Text, Button, StyleSheet, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { googleMapsConfig } from '../Firebase/firebaseSetup';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function LocationManager() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [locationData, setLocationData] = useState({
    latitude: null,
    longitude: null
  });
  const [mapUrl, setMapUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, requestPermission] = Location.useForegroundPermissions();

  // Handle selected location from map
  useEffect(() => {
    if (route.params?.selectedLocation) {
      setLocationData({
        latitude: route.params.selectedLocation.latitude,
        longitude: route.params.selectedLocation.longitude
      });
    }
  }, [route.params?.selectedLocation]);

  // Generate map URL when location changes
  useEffect(() => {
    if (locationData.latitude && locationData.longitude) {
      const url = `https://maps.googleapis.com/maps/api/staticmap?center=${locationData.latitude},${locationData.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${locationData.latitude},${locationData.longitude}&key=${googleMapsConfig.apiKey}`;
      setMapUrl(url);
    }
  }, [locationData]);

  // Verify location permissions
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

  // Get current location
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

  // Navigate to interactive map
  const navigateToMap = () => {
    if (locationData.latitude && locationData.longitude) {
      navigation.navigate('Map', { location: locationData });
    } else {
      Alert.alert(
        "No location",
        "Please find your location first",
        [{ text: "Okay" }]
      );
    }
  };

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
          
          <View style={styles.mapContainer}>
            <Image
              source={{ uri: mapUrl }}
              style={styles.map}
              resizeMode="cover"
            />
          </View>

          <Button 
            title="OPEN INTERACTIVE MAP"
            onPress={navigateToMap}
            color="#4CAF50"
          />
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
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  map: {
    width: '100%',
    height: 200,
  }
});