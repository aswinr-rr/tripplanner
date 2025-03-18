import Login from './Login';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedLogin = await AsyncStorage.getItem('isLoggedIn'); // Correct key
      if (storedLogin === 'true') {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (isLoggedIn) {
    return <Redirect href="/mytrip" />; // Redirects if already logged in
  }

  return <Login />;
}
