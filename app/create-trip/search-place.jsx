import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function SearchPlace() {

    const navigation=useNavigation();
    const router=useRouter ();
    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:'Search',
        })

    },[])

  return (
    <View
    style={{

        padding:25,
        paddingTop:75,
        backgroundColor:Colors.WHITE,
        height:'100%'
    }}>
      <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        router.push('/create-trip/select-traveller')
      }}
      query={{
        key: 'YOUR API KEY',
        language: 'en',
      }}
    />
    <View>
      <TouchableOpacity
        onPress={()=>router.push('/create-trip/select-traveller')}
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
          Go Ahead
        </Text>
        </TouchableOpacity>
    </View>
    </View>
  )
}