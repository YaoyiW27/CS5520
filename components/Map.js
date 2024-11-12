import { StyleSheet, View, Button } from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from '@react-navigation/native';

export default function Map({ route }) {
  const navigation = useNavigation();
  // State for selected location
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Get initial location from route params or use default
  const initialRegion = route.params?.location ? {
    latitude: route.params.location.latitude,
    longitude: route.params.location.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  } : {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Handle map press
  const handleMapPress = (event) => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  // Handle confirm button press
  const handleConfirmLocation = () => {
    if (selectedLocation) {
      // Navigate back and pass selected location
      navigation.navigate('Profile', { selectedLocation });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            title="Selected Location"
          />
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button
          title="Confirm Selected Location"
          onPress={handleConfirmLocation}
          disabled={!selectedLocation}
          color="#2196F3"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    paddingHorizontal: 20,
  }
});