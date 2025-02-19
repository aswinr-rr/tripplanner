import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function StartNewTripCard() {

  const router=useRouter();
  return (
    <View
    style={{
        padding:20,
        marginTop:135,
        display:'flex',
        alignItems:'center',
        gap:20,

    }}>
        <Ionicons name="location-sharp" size={24} color="black" />
      <Text
      style={{
        fontSize:23,
        fontFamily:'outfit-medium',
        color:Colors.BLUE1,
      }}>No Trips Planned yet!</Text>
        <Text
      style={{
        fontSize:20,
        fontFamily:'outfit',
        textAlign:'center',
        color:Colors.BLUE2
      }}>Looks like its time to plan a new travel experience!. Get Started Below.</Text>
    <TouchableOpacity
    onPress={()=>router.push('/create-trip/search-place')}
    style={{
        padding:30,
        backgroundColor:Colors.BLUE1,
        borderRadius:20,
        paddingHorizontal:25,
        paddingVertical:15,

    }}>
        <Text style={{
        color:Colors.WHITE,
    fontFamily:'outfit-medium'}}
        >Start a New Trip</Text>
    </TouchableOpacity>

    </View>
  )
}