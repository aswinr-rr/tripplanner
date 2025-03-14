import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function FlightInfo({ flightData }) {
  return (
    <View style={{
      marginTop: 20,
      borderWidth:1,
      borderColor:Colors.BLUE2,
      padding:10,
      borderRadius:15,

    }}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20,
        }}>Flights</Text>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: Colors.BLUE1,
            borderRadius: 15,
            width: 120,
          }}>
          <Text style={{
            color: Colors.WHITE,
            fontFamily: 'outfit',
            textAlign: 'center'
          }}>
            Book Here
          </Text>
        </TouchableOpacity>
      </View>
      <Text>
        Airline: Delta
      </Text>
      <Text>Price: {flightData.prices}</Text>
    </View>
  )
}