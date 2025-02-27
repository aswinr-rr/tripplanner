import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {CreateTripContext} from './../../context/CreateTripContext';

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
    <View
    style={{

        padding:25,
        paddingTop:75,
        backgroundColor:Colors.WHITE,
        height:'100%'
    }}>
      <GooglePlacesAutocomplete
      placeholder='Search Place'
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
        textInputContainer:{
          borderWidth:2,
          borderRadius:7,
          marginTop:25,
        }
      }}
    />
    {/* <View>
      <TouchableOpacity
        onPress={()=>router.push('/create-trip/select-traveller')}
      style={{
        padding:15,
        backgroundColor:Colors.WHITE,
        borderRadius:15,
        marginTop:25,
        borderWidth:1,
      }}>
        <Text style={{
          color:Colors.PRIMARY,
          fontFamily:'outfit',
          textAlign:'center'
        }}>
          Go Ahead
        </Text>
        </TouchableOpacity>
    </View> */}
    </View>
  )
}