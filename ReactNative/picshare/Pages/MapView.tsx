import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker, Region} from 'react-native-maps';
import mapStyle from './customMapStyle.json'; // import your custom map style
import { ScrollView } from 'react-native';
import PostCard from '../Pages/PostCard'
const MapViewPage = () => {
  const TOP_PLACES = [
    {
      id: 1,
      lat: 43.638993,
      long: -79.412941,
      image: require('../assets/temp.png'),
      title: 'Amalfi',
      location: 'Italy',
      description:
        'The ultimate Amalfi Coast travel guide, where to stay, where to eat, and what areas to visit in the Amalfi Coast of Italy. Positano, Ravello, Amalfi and more',
    },
    {
      id: 2,
      lat: 36.289726,
      long: -121.752682,
      image: require('../assets/temp.png'),
      title: 'Granada',
      location: 'Spain',
      description:
        'Granada is the capital city of the province of Granada, in the autonomous community of Andalusia, Spain',
    },
    {
      id: 3,
      lat: 35.275067,
      long: -120.797179,
      image: require('../assets/temp.png'),
      title: 'Cherry blossoms',
      location: 'Japan',
      description:
        "Cherry blossoms usually bloom between mid-March and early May. In 2022, Tokyo's cherry blossom season officially began on March 20",
    },
  ];

  const [currentRegion, setCurrentRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 1.0,
    longitudeDelta: 1.0,
  });
  const [shouldUpdateRegion, setShouldUpdateRegion] = useState(true);

  const handleRegionChange = (region: Region) => {
    if(shouldUpdateRegion){
      setCurrentRegion(region);
    }
    
  };

  const handleRegionChangeComplete = (region: Region) => {
    setShouldUpdateRegion(false);
  };

  const handleCardPress = (latitude: number, longitude: number) => {
    setCurrentRegion({
      latitude,
      longitude,
      latitudeDelta: 1.0,
      longitudeDelta: 1.0,
    });
    setShouldUpdateRegion(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{flex: 1}}
        // initialRegion={{
        //   latitude: 37.78825,
        //   longitude: -122.4324,
        //   latitudeDelta: 1.0,
        //   longitudeDelta: 1.0,
        // }}
        region={currentRegion}
        onRegionChange={handleRegionChange}
        onRegionChangeComplete={handleRegionChangeComplete}
        customMapStyle={mapStyle}
      >
        
        
        {TOP_PLACES.map((place, index) => (
        <Marker
          key={index}
          coordinate={{latitude: place.lat, longitude: place.long}}
          pinColor={'orange'}
        />
      ))}

        {/* <Marker
          coordinate={{latitude: 37.78825, longitude: -122.4324}}
          pinColor={'orange'} // set the color of the marker pin to orange
          
        /> */}
        

      </MapView>
      <View style={styles.carouselContainer}>
          <PostCard list={TOP_PLACES} itemPress={handleCardPress}/>
      </View>
    </View>
  );

  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  carouselContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
});

export default MapViewPage;
