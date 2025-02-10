import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import {Colors} from './../../../constants/Colors'
import { replace } from 'expo-router/build/global-state/routing';
import Ionicons from '@expo/vector-icons/Ionicons'; 
export default function SignIn() {
    const navigation=useNavigation();
    const router=useRouter();
    useEffect(()=>{
      navigation.setOptions({
        headerShown:false
      })
    },[])
  return (
    <View style={{
      padding:25,
      paddingTop:10,
      backgroundColor:Colors.WHITE,
      height:'100%',
    }}>
      <TouchableOpacity onPress={()=>router.back()}>
      <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30,
        paddingTop:30,
        textAlign:'center'
      }}>
        Let's Sign You In
      </Text>
      <Text style={{
        fontFamily:'outfit',
        fontSize:30,
        fontSize:25,
        textAlign:'center',
      }}>
        Welcome Back
      </Text>
      <Text style={{
        fontFamily:'outfit',
        fontSize:30,
        fontSize:25,
        textAlign:'center'
      }}>
        You've Been Missed!
      </Text>
      <View>
        <Text style={{
          fontFamily:'outfit',
          padding:10
        }}>Email</Text>
        <TextInput
        style={styles.input} placeholder='Email'/>
      </View>
      <View>
        <Text style={{
          fontFamily:'outfit',
          padding:10
        }}>Password</Text>
        <TextInput
        secureTextEntry={true}
        style={styles.input} placeholder='Email'/>
      </View>
      <View
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
          Sign In
        </Text>
      </View>
      <TouchableOpacity
        onPress={()=>router.replace('auth/sign-up')}
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
          Create Account
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