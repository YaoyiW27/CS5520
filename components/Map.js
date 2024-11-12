import { StyleSheet } from 'react-native';
import React from 'react';
import MapView, { Marker } from "react-native-maps";

export default function Map({ route }) {
  const initialRegion = route.params?.location ? {
    latitude: route.params.location.latitude,
    longitude: route.params.location.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  } : {
    latitude: 37.78825,  // Default location if none provided
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={initialRegion}
    >
      <Marker
        coordinate={{
          latitude: initialRegion.latitude,
          longitude: initialRegion.longitude,
        }}
        title="Selected Location"
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
});