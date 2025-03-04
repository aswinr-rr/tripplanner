import { View, Text, Button } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';

export default function MyTrip() {
  const [userTrips,setUserTrips]=useState([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('isLoggedIn'); // ✅ Correct key
    setIsLoggingOut(true);
  };

  if (isLoggingOut) {
    return <Redirect href="/auth/sign-in" />; // Redirects to login page
  }

  // return (

  // );
  return(
    <View style={{
      padding:25,
      paddingTop:55,
      backgroundColor:Colors.WHITE,
      height:'100%'
    }}>
      <View
      style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
      }}>
      <Text
      style={{
        fontFamily:'outfit-bold',
        fontSize:30
      }}>My Trips</Text>
      <Ionicons name="add-sharp" size={24} color="black" />
      </View>
      {userTrips?.length==0?
        <StartNewTripCard/>
        :null
      }
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>MyTrip</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
      
    </View>
  )
}
