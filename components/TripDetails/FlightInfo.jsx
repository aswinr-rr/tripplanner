import { View, Text } from 'react-native'
import React from 'react'

export default function FlightInfo({flightData}) {
  return (
    <View>
      <Text>{flightData.prices}</Text>
    </View>
  )
}