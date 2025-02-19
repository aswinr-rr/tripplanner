import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import { auth } from '../../../configs/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUp() {
    const navigation=useNavigation();
    const router=useRouter();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [fullName,setfullName]=useState();


    useEffect(()=>{
      navigation.setOptions({
        headerShown:false
      })
    },[]);
    const OnCreateAccount=()=>{
      if (!email&&!password&&!fullName)
      {
        ToastAndroid.show('Please Enter all details',ToastAndroid.BOTTOM);
        return ;
      }


      createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    router.replace('/mytrip')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage,errorCode);
    // ..
  });
    }
  return (
    <View style={{
      padding:25,
      paddingTop:15,
      backgroundColor:Colors.WHITE,
      height:'100%'
    }}>
      <TouchableOpacity onPress={()=>router.back()}>
      <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30,
        textAlign:'center',
        paddingTop:30,
      }}>
        Create New Account!
      </Text>
      <View>
        <Text style={{
          fontFamily:'outfit',
          padding:10,
          paddingTop:30,
        }}>Full Name</Text>
        <TextInput
        style={styles.input} placeholder='Full Name'
        onChangeText={(Value)=>setfullName(Value)}/>
      </View>
      <View>
        <Text style={{
          fontFamily:'outfit',
          padding:10
        }}>Email</Text>
        <TextInput
        style={styles.input} placeholder='Email'
        onChangeText={(Value)=>setEmail(Value)}/>
      </View>
      <View>
        <Text style={{
          fontFamily:'outfit',
          padding:10
        }}>Password</Text>
        <TextInput
        secureTextEntry={true}
        style={styles.input} placeholder='Password'
        onChangeText={(Value)=>setPassword(Value)}/>
      </View>
      <TouchableOpacity onPress={OnCreateAccount}
      style={{
        padding:15,
        backgroundColor:Colors.BLUE1,
        borderRadius:15,
        marginTop:25
      }}>
        <Text style={{
          color:Colors.WHITE,
          fontFamily:'outfit',
          textAlign:'center'
        }}>
          Create Account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=>router.replace('auth/sign-in')}
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
          Sign In
        </Text>
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  input:{
    padding:15,
    borderWidth:1,
    borderRadius:15,
    borderColor:Colors.BLUE1,
    fontFamily:'outfit'
  }
})