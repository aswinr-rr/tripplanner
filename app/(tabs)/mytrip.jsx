import { View, Text, Button } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';

export default function MyTrip() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('isLoggedIn'); // ✅ Correct key
    setIsLoggingOut(true);
  };

  if (isLoggingOut) {
    return <Redirect href="/auth/sign-in" />; // Redirects to login page
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>MyTrip</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
