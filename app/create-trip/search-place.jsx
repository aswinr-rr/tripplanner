import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {CreateTripContext} from './../../context/CreateTripContext';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SearchPlace() {

    const navigation=useNavigation();
    const {tripData,setTripData}=useContext(CreateTripContext);
    const router=useRouter ();
    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:'Search ',
        })

    },[]);

    useEffect(()=>{
      console.log(tripData);
    }),[tripData]

  return (
    <View style={styles.container}>
      <Text style={styles.searchTitle}>Where would you like to go?</Text>
      <GooglePlacesAutocomplete
        placeholder='Search destination'
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data.description);
          console.log(details?.geometry.location);
          console.log(details?.photos[0]?.photo_reference);
          console.log(details?.url);
          setTripData({
            locationInfo:{
              name:data.description,
              coordinates:details?.geometry.location,
              photoRef:details?.photos[0]?.photo_reference,
              url:details?.url
            }
          })
          router.push('/create-trip/select-traveller')
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
          language: 'en',
        }}
        styles={{
          container: {
            flex: 0,
          },
          textInputContainer: {
            backgroundColor: 'transparent',
          },
          textInput: {
            height: 55,
            borderWidth: 1.5,
            borderColor: Colors.BLUE1,
            borderRadius: 12,
            paddingVertical: 12,
            paddingHorizontal: 15,
            fontSize: 16,
            fontFamily: 'outfit',
            color: '#333',
          },
          predefinedPlacesDescription: {
            color: Colors.BLUE1,
          },
          poweredContainer: {
            backgroundColor: '#f5f5f5',
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            padding: 10,
          },
          row: {
            backgroundColor: '#FFFFFF',
            padding: 13,
            height: 65,
            flexDirection: 'row',
            alignItems: 'center',
          },
          separator: {
            height: 1,
            backgroundColor: '#f0f0f0',
          },
          description: {
            fontFamily: 'outfit',
            fontSize: 15,
          },
          loader: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 20,
          },
        }}
        renderRow={(data) => (
          <View style={styles.suggestionRow}>
            <Ionicons name="location-outline" size={22} color={Colors.BLUE1} style={styles.locationIcon} />
            <View>
              <Text style={styles.mainText}>{data.structured_formatting?.main_text || data.description}</Text>
              {data.structured_formatting?.secondary_text && (
                <Text style={styles.secondaryText}>{data.structured_formatting.secondary_text}</Text>
              )}
            </View>
          </View>
        )}
      />
      <View style={styles.recentSearches}>
        <Text style={styles.recentTitle}>Popular Destinations</Text>
        <TouchableOpacity style={styles.recentItem}>
          <Ionicons name="time-outline" size={20} color="#777" style={styles.recentIcon} />
          <Text style={styles.recentText}>New York, USA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.recentItem}>
          <Ionicons name="time-outline" size={20} color="#777" style={styles.recentIcon} />
          <Text style={styles.recentText}>Paris, France</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.recentItem}>
          <Ionicons name="time-outline" size={20} color="#777" style={styles.recentIcon} />
          <Text style={styles.recentText}>Tokyo, Japan</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 75,
    backgroundColor: Colors.WHITE,
    height: '100%',
  },
  searchTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 24,
    marginBottom: 20,
    color: Colors.BLUE1,
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 10,
  },
  mainText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#333',
  },
  secondaryText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#777',
    marginTop: 3,
  },
  recentSearches: {
    marginTop: 30,
  },
  recentTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  recentIcon: {
    marginRight: 10,
  },
  recentText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#555',
  },
});