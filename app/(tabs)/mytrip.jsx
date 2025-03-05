import { View, Text, Button, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './../../configs/FirebaseConfig';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import UserTripList from '../../components/MyTrips/UserTripList';

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && GetMyTrips();
  }, [user])


  const GetMyTrips = async () => {
    setLoading(true);
    setUserTrips([]);
    const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user?.email))
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUserTrips(prev => [...prev, doc.data()])
    });
    setLoading(false);

  }
  // const [isLoggingOut, setIsLoggingOut] = useState(false);

  // const handleLogout = async () => {
  //   await AsyncStorage.removeItem('isLoggedIn'); // ✅ Correct key
  //   setIsLoggingOut(true);
  // };

  // if (isLoggingOut) {
  //   return <Redirect href="/auth/sign-in" />; // Redirects to login page
  // }

  // return (

  // );
  return (
    <ScrollView style={{
      padding: 25,
      paddingTop: 55,
      backgroundColor: Colors.WHITE,
      height: '100%'
    }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 30
          }}>My Trips</Text>
        <Ionicons name="add-sharp" size={24} color="black" />
      </View>
      {loading && <ActivityIndicator size={'large'} />}
      {userTrips?.length == 0 ?
        <StartNewTripCard />
        : <UserTripList userTrips={userTrips} />
      }
      {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>MyTrip</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View> */}

    </ScrollView>
  )
}
