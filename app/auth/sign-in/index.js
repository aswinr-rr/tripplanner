import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import {Colors} from './../../../constants/Colors'
import { replace } from 'expo-router/build/global-state/routing';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../../../configs/FirebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn() {
    const navigation=useNavigation();
    const router=useRouter();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [loggedIn, setLoggedIn] = useState(false);


    useEffect(()=>{
      navigation.setOptions({
        headerShown:false
      })
    },[])
    const onSignIn = async () => {
      if (!email || !password) {
        ToastAndroid.show("Please enter all details", ToastAndroid.LONG);
        return;
      }
    
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User Signed In:", user);
    
        // ✅ Store login session correctly
        await AsyncStorage.setItem('isLoggedIn', 'true'); // Change from 'userToken' to 'isLoggedIn'
    
        // Replace the current screen with MyTrip page
        router.replace('/mytrip');
    
      } catch (error) {
        console.log("Login Error:", error.message);
        if (error.code === 'auth/invalid-credential'||'auth/invalid-email') {
          ToastAndroid.show('Invalid Credentials', ToastAndroid.LONG);
        }
      }
    };
    
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>router.back()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          Let's Sign You In
        </Text>
        <Text style={styles.headerSubtitle}>
          Welcome Back
        </Text>
        <Text style={styles.headerSubtitle}>
          You've Been Missed!
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input} 
            onChangeText={(value)=>setEmail(value)}
            placeholder='Email'
            placeholderTextColor="#A0A0A0"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input} 
            onChangeText={(value)=>setPassword(value)}
            placeholder='Password'
            placeholderTextColor="#A0A0A0"
          />
        </View>
      </View>

      {/* Sign In Button */}
      <TouchableOpacity 
        onPress={onSignIn}
        style={styles.signInButton}
      >
        <Text style={styles.signInButtonText}>
          Sign In
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={()=>router.replace('auth/sign-up')}
        style={styles.createAccountButton}
      >
        <Text style={styles.createAccountButtonText}>
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 10,
    backgroundColor: Colors.WHITE,
    height: '100%',
  },
  backButton: {
    marginBottom: 10,
    padding: 5,
  },
  headerContainer: {
    marginVertical: 20,
  },
  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 30,
    paddingTop: 10,
    textAlign: 'center',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontFamily: 'outfit',
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 30,
  },
  formContainer: {
    marginTop: 25,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontFamily: 'outfit',
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 5,
    color: Colors.PRIMARY,
  },
  input: {
    padding: 15,
    borderWidth: 1.5,
    borderRadius: 15,
    borderColor: Colors.BLUE1,
    fontFamily: 'outfit',
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  signInButton: {
    padding: 16,
    backgroundColor: Colors.BLUE1,
    borderRadius: 15,
    marginTop: 30,
    shadowColor: Colors.BLUE1,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  signInButtonText: {
    color: Colors.WHITE,
    fontFamily: 'outfit',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  createAccountButton: {
    padding: 16,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginTop: 15,
    borderWidth: 1.5,
    borderColor: Colors.PRIMARY,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  createAccountButtonText: {
    color: Colors.PRIMARY,
    fontFamily: 'outfit',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  }
});