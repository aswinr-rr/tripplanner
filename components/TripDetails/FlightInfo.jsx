import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

export default function FlightInfo({ flightData }) {
  return (
    <View style={{
      marginTop: 20,
      padding: 15, // Subtle blue background for consistency
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    }}>
      
      {/* Header Section */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20,
          color: Colors.BLACK,
        }}>
          Flights
        </Text>

        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
            backgroundColor: Colors.BLUE1,
            borderRadius: 15,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
          }}>
          <Text style={{
            color: Colors.WHITE,
            fontFamily: 'outfit-medium',
            textAlign: 'center',
            fontSize: 16,
          }}>
            Book Here
          </Text>
        </TouchableOpacity>
      </View>

      {/* Flight Details Section */}
      <View style={{
  borderTopWidth: 1,
  borderTopColor: Colors.BLUE2,
  paddingTop: 10,
}}>
  <Text style={{
    fontFamily: 'outfit',
    fontSize: 18,
    color: Colors.DARK_GRAY,
    marginBottom: 5,
  }}>
    Airline: {flightData?.airline || 'Not Available'}
  </Text>

  {/* Flight Prices Section */}
  <View style={{
    marginTop: 5,
    padding: 10,
    backgroundColor: Colors.LIGHT_BLUE, // Light background for better contrast
    borderRadius: 10,
  }}>
    {flightData?.prices ? (
      Object.entries(flightData.prices).map(([category, price], index) => (
        <Text key={index} style={{
          fontFamily: 'outfit-medium',
          fontSize: 17,
          color: Colors.DARK_GRAY,
          marginBottom: 3,
        }}>
          {category.charAt(0).toUpperCase() + category.slice(1)}: {price}
        </Text>
      ))
    ) : (
      <Text style={{
        fontFamily: 'outfit',
        fontSize: 17,
        color: Colors.DARK_GRAY,
      }}>
        Price: N/A
      </Text>
    )}
  </View>
</View>


    </View>
  );
}
