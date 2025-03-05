import { View, Text, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, router } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function Profile() {
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
      <Text>Profile</Text>
      <Button title="Logout" onPress={handleLogout} />
      <View>
        <TouchableOpacity
          onPress={() => router.push('create-trip/search-place')}
          style={{
            padding: 15,
            backgroundColor: Colors.BLUE1,
            borderRadius: 15,
            marginTop: 25,
            borderWidth: 1,
          }}>
          <Text style={{
            color: Colors.WHITE,
            fontFamily: 'outfit',
            textAlign: 'center'
          }}>
            gen again
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
