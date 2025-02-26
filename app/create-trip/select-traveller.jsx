import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import {SelectTravellerList} from './../../constants/Options'
import OptionCard from '../../components/CreateTrip/OptionCard';

export default function selecttraveller() {
    const navigation=useNavigation();
    const [selectedTraveller,setSelectedTraveller]=useState();
    

    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:'',
        })
    })
  return (
    <View style={{
        padding:25,
        paddingTop:75,
        backgroundColor:Colors.WHITE,
        height:'100%'
    }}>
      <Text style={{
        fontSize:35,
        fontFamily:'outfit-bold',
        marginTop:20,
        color:Colors.BLUE1,
      }}>Who's Travelling</Text>
      <View>
        <Text style={{
        fontSize:20,
        fontFamily:'outfit',
        color:Colors.BLUE2,
        marginTop:10
      }}>Choose your travellers</Text>
      <FlatList
      data={SelectTravellerList}
      renderItem={({item,index})=>(
        <TouchableOpacity 
        onPress={()=>setSelectedTraveller(item.title)}

        style={{
            marginVertical:10
        }}>
            <OptionCard option={item} selectedTraveller={selectedTraveller}/>
        </TouchableOpacity>
      )}/>

      </View>
    </View>
  )
}