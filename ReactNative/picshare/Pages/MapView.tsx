import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import mapStyle from './customMapStyle.json'; // import your custom map style
import { ScrollView } from 'react-native';
import PostCard from '../Pages/PostCard'
const MapViewPage = () => {
  const TOP_PLACES = [
    {
      id: 1,
      image: require('../assets/temp.png'),
      title: 'Amalfi',
      location: 'Italy',
      description:
        'The ultimate Amalfi Coast travel guide, where to stay, where to eat, and what areas to visit in the Amalfi Coast of Italy. Positano, Ravello, Amalfi and more',
    },
    {
      id: 2,
      image: require('../assets/temp.png'),
      title: 'Granada',
      location: 'Spain',
      description:
        'Granada is the capital city of the province of Granada, in the autonomous community of Andalusia, Spain',
    },
    {
      id: 3,
      image: require('../assets/temp.png'),
      title: 'Cherry blossoms',
      location: 'Japan',
      description:
        "Cherry blossoms usually bloom between mid-March and early May. In 2022, Tokyo's cherry blossom season officially began on March 20",
    },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 1.0,
          longitudeDelta: 1.0,
        }}
        customMapStyle={mapStyle}
      >
        
        

        <Marker
          coordinate={{latitude: 37.78825, longitude: -122.4324}}
          pinColor={'orange'} // set the color of the marker pin to orange
          
        />
        

      </MapView>
      <View style={styles.carouselContainer}>
          <PostCard list={TOP_PLACES}/>
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
