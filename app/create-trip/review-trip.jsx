import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import {CreateTripContext} from './../../context/CreateTripContext';
import moment from 'moment';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default function ReviewTrip() {
  
    const navigation = useNavigation();
    const {tripData,setTripData}=useContext(CreateTripContext)


    const router=useRouter();
    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:'',
        })
    },[]);
    return (
    <View style={{
        padding:25,
        paddingTop:50,
        backgroundColor:Colors.WHITE,
        height:'100%'
    }}> 
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:35,
        marginTop:20
      }}>ReviewTrip</Text>

      <View style={{
        marginTop:20,
      }}>
        <Text style={{
            fontFamily:'outfit-medium',
            fontSize:20,
        }}>Before Generating Your Trip, Please review your selection.!</Text>
      
      {/* Destination review */}

      <View style={{
        marginTop:25,
        display:'flex',
        flexDirection:'row',
        gap:20
      }}>
      <Ionicons name="location-sharp" size={35} color="black" />
      <View>
        <Text style={{
            fontFamily:'outfit',
            fontSize:20,
        }}>Destination</Text>
        <Text style={{
            fontFamily:'outfit-medium',
            fontSize:20,

        }}>{tripData?.locationInfo?.name}</Text>
      </View>
      </View>
        {/* Dates */}
      <View style={{
        marginTop:25,
        display:'flex',
        flexDirection:'row',
        gap:20
      }}>
      <Ionicons name="calendar" size={35} color="black" />
      <View>
        <Text style={{
            fontFamily:'outfit',
            fontSize:20,
        }}>Travel dates</Text>
        <Text style={{
            fontFamily:'outfit-medium',
            fontSize:20,

        }}>{moment(tripData?.startDate).format('DD MMM')+"To "+moment(tripData.endDate).format('DD MMM ')}
        ({tripData?.totalNoOfDays} days)
        </Text>
      </View>
      </View>

        {/* Travellers */}
        <View style={{
        marginTop:25,
        display:'flex',
        flexDirection:'row',
        gap:20
      }}>
        <MaterialCommunityIcons name="bag-checked" size={35} color="black" />      
        <View>
        <Text style={{
            fontFamily:'outfit',
            fontSize:20,
        }}>Who's Travelling</Text>
        <Text style={{
            fontFamily:'outfit-medium',
            fontSize:20,
        }}>{tripData?.traveller?.title}
        </Text>
      </View>
      </View>
        {/* Budget */}
      <View style={{
        marginTop:25,
        display:'flex',
        flexDirection:'row',
        gap:20
      }}>
        <MaterialIcons name="attach-money" size={35} color="black" />      
    <View>
        <Text style={{
            fontFamily:'outfit',
            fontSize:20,
        }}>Budget</Text>
        <Text style={{
            fontFamily:'outfit-medium',
            fontSize:20,

        }}>{tripData?.budget}
        </Text>
    </View>
      </View>
      
      
      </View>

        <TouchableOpacity
        onPress={()=>router.replace('/create-trip/generate-trip')}
        style={{
        padding:15,
        backgroundColor:Colors.BLUE1,
        borderRadius:15,
        marginTop:60,
        }}>
        <Text style={{
            textAlign:'center',
            color:Colors.WHITE,
            fontFamily:'outfit-medium',
            fontSize:15,
        }}>
            Build My trip
        </Text>
        </TouchableOpacity>
      
    </View>
  )
}