import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons'; 

export default function SignUp() {
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
        style={styles.input} placeholder='Email'/>
      </View>
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
      <TouchableOpacity
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